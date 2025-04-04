const nodemailer = require('nodemailer') ;
const  {genjwt , verifyjwt} = require('../utils/jwtUtils');
const sendmail = async(email , subject,content) =>{
    
    let transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'koorahubb@gmail.com', 
                pass: 'kvro xetd wnka zfzu', 
            },
        });
    
        let mailoptions = {
            from: 'mohamedchinne@gmail.com',
            to: email,
            subject: subject,
            html:  content
        };
    
        await transport.sendMail(mailoptions)

}
const gen_email_verification_Link = (email , id)=>{
      token = genjwt({email,id},'15m') ; 
        const link = process.env.domain+process.env.port+'/verify?token='+token;
        return link ; 

}

module.exports = {sendmail,gen_email_verification_Link}

