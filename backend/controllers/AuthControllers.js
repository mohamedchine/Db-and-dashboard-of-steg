const {validateRegister,validatelogin} = require('../utils/validationUtils');

const db = require('../config/db');
const {verifyjwt ,genjwt } = require('../utils/jwtUtils');
const { hashPassword, comparepassword } = require('../utils/hashingUtils');
const { gen_email_verification_Link,sendmail } = require('../utils/mailUtils');

const registerCtrl = async(req,res)=>{
    
    //data validation
    const {error} = validateRegister(req.body);
    if(error){
        return res.status(400).json({
            error : error.details[0].message
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
        return res.status(400).json({ message: "An account with that email already exists" });
    }
    // in here we gotta somework to do if the user unverified we gotta check if he has an account or not
     
         
    //check if the user email exist in the stegdb(the email was giving from the steg or not) 
    const isemailgfs = await db.execute("select * from "+unit+"_employee_emails where employee_email = ?  and "+unit+"_id =? " ,[steg_email,unitid]);
    if(isemailgfs[0].length ==0) return res.status(400).json({message : "we couldn't find the email u provided inside the  "+unit_exist[0][0]["name"]+" contact the hr in ur "+unit+" to add it if u want"}) ;
  
    
    
      
    // hash the password 
    const { fullname , password} = req.body ;
    const hashedpassword = await hashPassword(password);

   //save the user in the db
   const result = await db.execute('insert into '+unit+'_accounts (fullname,steg_email,password ,'+unit+'_id)  VALUES (?,?,?,?) ',[fullname,steg_email,hashedpassword,unitid])
    
    //generate and send a mail verification link to the user
    const verificationLink =  gen_email_verification_Link(steg_email ,result[0].insertId)  ; 
    await sendmail(steg_email , 'Email Verification' , 'click  <a href ='+ verificationLink+' > here   </a> to verify your email ') ;  
    return res.status(201).json({message : "we've sent you a verification link to your email"});

}


//we will add recaptcha to it and resend verif link and also rate limit

const verifyAccountCtrl = async (req, res) => {
    const { token } = req.query;
    if (!token) return res.status(404);

    const payload = verifyjwt(token);
    if (!payload) return res.status(401).json({ message: "Invalid or expired link" });

    const { email, id } = payload;


    const [centralUpdateResult] = await db.execute(
        "UPDATE central_accounts SET is_verified = 1 WHERE steg_email = ? AND id = ?",
        [email, id]
    );

    if (centralUpdateResult.affectedRows === 0) {

        const [groupementUpdateResult] = await db.execute(
            "UPDATE groupement_accounts SET is_verified = 1 WHERE steg_email = ? AND id = ?",
            [email, id]
        );

        if (groupementUpdateResult.affectedRows === 0) {

            const [directionUpdateResult] = await db.execute(
                "UPDATE direction_accounts SET is_verified = 1 WHERE steg_email = ? AND id = ?",
                [email, id]
            );

            if (directionUpdateResult.affectedRows === 0) {
                return res.status(404);
            }
        }
    }

    res.status(201).json({ message: "Account verified successfully" });
};


//rate limit recaptcha
const loginCtrl = async (req, res) => {
 
        const { error } = validatelogin(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const [directionempl] = await db.execute("select * from direction_accounts where steg_email = ?" , [req.body.steg_email])
        
        if (directionempl.length > 0) {
            const user = directionempl[0];

            const passwordMatch = await comparepassword(user.password, req.body.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: "Incorrect password" });
            }
            if (!user.is_verified) {
                return res.status(403).json({ message: "You have to verify your account before logging in." });
            }
          
            
                   
            const token = genjwt( { id: user.id, steg_email: user.steg_email, role: "direction_employee"  },
            "7d" )

            res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "Strict" });

            return res.status(200).json({ message: "Logged in successfully", user });
        }


        const [centralEmployee] = await db.execute(
            "SELECT * FROM central_accounts WHERE steg_email = ?", 
            [req.body.steg_email]
        );

        if (centralEmployee.length > 0) {
            const user = centralEmployee[0];

            const passwordMatch = await comparepassword(user.password, req.body.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: "Incorrect password" });
            }
            if (!user.is_verified) {
                return res.status(403).json({ message: "You have to verify your account before logging in." });
            }
          
            
                   
            const token = genjwt( { id: user.id, steg_email: user.steg_email, role: "central_employee" },
            "7d" )

            res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "Strict" });

            return res.status(200).json({ message: "Logged in successfully", user });
        }

        const [groupementEmployee] = await db.execute(
            "SELECT * FROM groupement_accounts WHERE steg_email = ?", 
            [req.body.steg_email]
        );

        if (groupementEmployee.length === 0) {
            return res.status(401).json({ error: "Incorrect email" });
        }

        const user = groupementEmployee[0];

        const passwordMatch = await comparepassword(user.password, req.body.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }
        if (!user.is_verified) {
            return res.status(403).json({ message: "You have to verify your account before logging in." });
        }
        
       
        const token = genjwt( { id: user.id, steg_email: user.steg_email, role: "groupement_employee" },
            "7d" )

        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "Strict" });

        return res.status(200).json({ message: "Logged in successfully", user });

 
};


module.exports={registerCtrl,verifyAccountCtrl , loginCtrl} ;