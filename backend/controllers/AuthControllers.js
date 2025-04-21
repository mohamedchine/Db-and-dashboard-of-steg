const {validateRegister,validatelogin} = require('../utils/validationUtils');

const db = require('../config/db');
const {verifyjwt ,genjwt } = require('../utils/jwtUtils');
const { hashPassword, comparepassword } = require('../utils/hashingUtils');
const { gen_email_verification_Link,sendmail } = require('../utils/mailUtils');
const { findUserByEmail ,findUserById} = require('../utils/dbUtils');
const registerCtrl = async(req,res)=>{
    
    //data validation
    const {error} = validateRegister(req.body);
    if(error){
        return res.status(400).json({
            message : error.details[0].message
        })
    }
  

    //check if the unit exist in db(in case a bad user somehow injected an unexested unit in the list ) 
    const {unit , unitid} = req.body ; 
         const unit_exist = await db.execute("select * from "+unit+" where "+unit+"_id = ? ",[unitid]) ; 
         if(unit_exist[0].length==0) return res.status(404); //return for him 404 no response just 404

    //now we check if the useremail already exist(already has an account or not)
    const {steg_email} = req.body ;
    const [user_exist] = await db.execute(
        `SELECT * FROM ${unit}_accounts WHERE steg_email = ?`,
        [steg_email]
    );
    
    if (user_exist.length > 0) {
        return res.status(400).json({ message: "An account with that email already exists " });
    }
    // in here we gotta somework to do if the user unverified we gotta check if he has an account or not
     
         
    //check if the user email exist in the stegdb(the email was giving from the steg or not) 
    const isemailgfs = await db.execute("select * from "+unit+"_employee_emails where employee_email = ?  and "+unit+"_id =? " ,[steg_email,unitid]);
    if(isemailgfs[0].length ==0) return res.status(403).json({message : "we couldn't find the email u provided inside the  "+unit_exist[0][0]["name"]+" contact the hr in ur "+unit+" to add it if u want"}) ;
  
    
    
      
    // hash the password 
    const { fullname , password} = req.body ;
    const hashedpassword = await hashPassword(password);

   //save the user in the db
   const result = await db.execute('insert into '+unit+'_accounts (fullname,steg_email,password ,'+unit+'_id)  VALUES (?,?,?,?) ',[fullname,steg_email,hashedpassword,unitid])
    
    //generate and send a mail verification link to the user
    const verificationLink =  gen_email_verification_Link(steg_email ,result[0].insertId)  ; 
    await sendmail(steg_email , 'Email Verification' , 'click  <a href ='+ verificationLink+' > here   </a> to verify your email ') ;  
    return res.status(201).json({message : "Registration successfuly ! we've sent a verification link to your email"});

}


//we will add recaptcha to it and resend verif link and also rate limit

const verifyAccountCtrl = async (req, res) => {
    const { token } = req.query;
    if (!token) return res.status(403);

    const payload = verifyjwt(token);
    if (!payload) {
        // jwt.verify returns null if it's tampered with or expired
        return res.status(401).send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Error</title>
                <script>
                    alert("Invalid or expired link (login to be able to resend a verification link)");
                </script>
            </head>
            <body>
                
            </body>
            </html>
        `);
    }

    const { email, id } = payload;
    const accountTypes = ['central', 'groupement', 'direction'];

    for (const type of accountTypes) {
        // Check if the account is already verified
        const [checkResult] = await db.execute(
            `SELECT is_verified FROM ${type}_accounts WHERE steg_email = ? AND id = ?`,
            [email, id]
        );

        if (checkResult[0].is_verified) {
            return res.status(200).send(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Already Verified</title>
                    <script>
                        alert("Account is already verified. You can login now.");
                    </script>
                </head>
                <body>
                    
                </body>
                </html>
            `);
        }

        // update the is_verified status
         await db.execute(
            `UPDATE ${type}_accounts SET is_verified = 1 WHERE steg_email = ? AND id = ?`,
            [email, id]
        );
         return res.status(201).send(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Verification</title>
                    <script>
                        alert("Account verified successfully 🎉 , now you can login");
                    </script>
                </head>
                <body>
                    
                </body>
                </html>
            `);
    }


};





//rate limit recaptcha
const loginCtrl = async (req, res) => {
    //data validation
    const { error } = validatelogin(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
     
    //checking if the user exist in the db
    const {user , unittype, unitname} = await findUserByEmail(req.body.steg_email);
    if (!user) {
        return res.status(401).json({ message: "Incorrect email" });
    }

    const passwordMatch = await comparepassword(user.password, req.body.password);
    if (!passwordMatch) {
        return res.status(401).json({ message: "Incorrect password" });
    }

    if (!user.is_verified) {
       const verificationLink = gen_email_verification_Link(user.steg_email, user.id);
       await sendmail(user.steg_email, "Email Verification", `Click <a href="${verificationLink}">here</a> to verify your email`);
       return res.status(401).json({ message: "you are not verified yet , click the link that we've mailed you to verify your account" });

    }
     const unitidstring = unittype+'_id' //just to get the name of the unit
    const token = genjwt({ id: user.id, unittype , unitid : user.unitidstring }, "7d"); 
    res.cookie("Accesstoken", token, { httpOnly: true, secure: true, sameSite: "Strict" });
    const {password , ...userr} = user ; 
    // we also need to send back the unitname to do it in top of the dashboard 
    userr.unitname = unitname ; 
    userr.unittype = unittype ;
    return res.status(200).json({ message: "Logged in successfully", user:userr   });
};

//this run when u close and oppen the app 
const checkauthctrl = async (req, res) => {
    const { Accesstoken } = req.cookies;

    if (!Accesstoken) {
        return res.status(401).json({ user: null  });
    }

    const payload = verifyjwt(Accesstoken);
    if (!payload) {
        return res.status(401).json({ user: null  });
    }

        const { user, unittype, unitname } = await findUserById(payload.id);
        if (!user) {
            return res.status(401).json({ user: null });
        }

        const { password, ...userr } = user;
       
        userr.unitname = unitname;
        userr.unittype = unittype;
        return res.status(200).json({
            user: userr
        });

};


const logoutCtrl = (req, res) => {
    res.clearCookie('Accesstoken', { httpOnly: true, secure: true, sameSite: 'Strict' });

    return res.status(200).json({ message: "Logged out successfully" });
};


module.exports={registerCtrl,verifyAccountCtrl , loginCtrl , logoutCtrl,checkauthctrl } ;