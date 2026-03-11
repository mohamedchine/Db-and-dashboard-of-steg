const axios = require('axios');

const sendEmail = async (userEmail, subject, htmlTemplate) => {
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

module.exports = sendEmail;