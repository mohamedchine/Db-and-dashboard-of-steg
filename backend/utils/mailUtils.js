const axios = require('axios');

const sendmail = async (userEmail, subject, htmlTemplate) => {
  try {
    await axios.post('https://api.brevo.com/v3/smtp/email', {
      sender: { name: 'Steg', email: process.env.APP_EMAIL_ADDRESS },
      to: [{ email: userEmail }],
      subject,
      htmlContent: htmlTemplate,
    }, {
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json',
      }
    });
  } catch (err) {
    console.error("couldn't send email", err);
    throw err;
  }
};

const gen_email_verification_Link = (email , id)=>{
      token = genjwt({email,id},'15m') ; 
        const link = process.env.BACKEND_URL+'/auth/verify-email?token='+token;
        return link ; 

}

module.exports = {sendmail,gen_email_verification_Link}

