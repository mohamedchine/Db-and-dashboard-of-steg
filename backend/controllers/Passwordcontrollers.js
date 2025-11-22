const { genjwt, verifyjwt } = require('../utils/jwtUtils');
const { sendmail } = require('../utils/mailUtils');
const { hashPassword } = require('../utils/hashingUtils');
const {validateResetpassword, validatePassword} = require('../utils/validationUtils');
const {findUserByEmail} = require('../utils/dbUtils')
const db = require('../config/db');

const requestPasswordResetCtrl = async (req, res) => {
    const { error } = validateResetpassword(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { steg_email } = req.body;

    const { user, unittype } = await findUserByEmail(steg_email);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const token = genjwt({ userid: user.id, steg_email: user.steg_email, unittype }, "10m");

    const resetLink = `${process.env.client_url}/reset-password?token=${token}`;
    await sendmail(
        steg_email,
        'Password Reset',
        `Click <a href="${resetLink}">here</a> to reset your password. If you didn't request this, please ignore this email.`
    );

    return res.status(200).json({ message: "Password reset link has been sent to your email" });
};

const resetPasswordCtrl = async (req, res) => {
    const { token, newPassword } = req.body;
   
    const payload = verifyjwt(token);
    if (!payload) {
        return res.status(400).json({ message: "Invalid or expired reset link , we will redirect you to request a new link" ,redirect : "/request-reset-password"  });
    }
    
    const { userid, steg_email, unittype } = payload;
    if(!userid || !steg_email ||!unittype ) return res.status(400).json({message : "that token is not meant for reseting the password"}); //in case user took the verify account token and put it in here 

    
    

    const {error} = validatePassword({newPassword});
    if (error)  return res.status(400).json({ message: error.details[0].message });
    const hashedPassword = await hashPassword(newPassword);
    await db.execute(
        `UPDATE ${unittype}_accounts SET password = ? WHERE id = ? AND steg_email = ?`,
        [hashedPassword, userid, steg_email]
    );
    

    return res.status(200).json({ message: "Password has been reset successfully now u can login" });
};


module.exports = {requestPasswordResetCtrl , resetPasswordCtrl}