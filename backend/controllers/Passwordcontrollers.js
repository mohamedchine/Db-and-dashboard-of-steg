const { genjwt, verifyjwt } = require('../utils/jwtUtils');
const { sendmail } = require('../utils/mailUtils');
const { hashPassword } = require('../utils/hashingUtils');
const db = require('../config/db');

const requestPasswordResetCtrl = async (req, res) => {
    const { steg_email } = req.body;

    // check if the email is provided
    if (!steg_email) {
        return res.status(400).json({ message: "Email is required" });
    }

    // find the user by email
    const { user ,role } = await findUserByEmail(steg_email);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // generate a password reset token
    const token = genjwt({ id: user.id, steg_email: user.steg_email, role }, "1h"); // Token valid for 1 hour

    // send the password reset email
    const resetLink = `${process.env.domain}${process.env.port}/reset-password?token=${token}`;
    await sendmail(steg_email, 'Password Reset', `Click <a href="${resetLink}">here</a> to reset your password if u didn't request this please ignore this email`);

    return res.status(200).json({ message: "Password reset link has been sent to your email" });
};
const resetPasswordCtrl = async (req, res) => {
    const { token, newPassword } = req.body;

    const payload = verifyjwt(token);
    if (!payload) {
        return res.status(400).json({ message: "Invalid or expired token" });
    }

    const { id, steg_email, role } = payload;

    const hashedPassword = await hashPassword(newPassword);


    await db.execute(
        `UPDATE ${role.split('_')[0]}_accounts SET password = ? WHERE id = ? AND steg_email = ?`,
        [hashedPassword, id, steg_email]
    );
    

    return res.status(200).json({ message: "Password has been reset successfully" });
};


module.exports = {requestPasswordResetCtrl , resetPasswordCtrl}