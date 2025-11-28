const nodemailer = require('nodemailer') ;
const  {genjwt , verifyjwt} = require('../utils/jwtUtils');
const sendmail = async (email, subject, content) => {
    const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: 'koorahubb@gmail.com', //temp mail just for testing
            pass: 'kvro xetd wnka zfzu',
        },
        connectionTimeout: 60000,
        socketTimeout: 60000,
        greetingTimeout: 30000,
    });

    const mailoptions = {
        from: 'koorahubb@gmail.com', 
        to: email,
        subject: subject,
        html: content,
    };

    await transport.sendMail(mailoptions);
};

const gen_email_verification_Link = (email , id)=>{
      token = genjwt({email,id},'15m') ; 
        const link = process.env.BACKEND_URL+'/auth/verify-email?token='+token;
        return link ; 

}

module.exports = {sendmail,gen_email_verification_Link}

