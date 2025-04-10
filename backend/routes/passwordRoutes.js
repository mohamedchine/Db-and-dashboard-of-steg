const express = require('express');
const PasswordRouter = express.Router();
const { requestPasswordResetCtrl, resetPasswordCtrl } = require('../controllers/Passwordcontrollers');

PasswordRouter.post('/request-password-reset', requestPasswordResetCtrl);
PasswordRouter.post('/reset-password', resetPasswordCtrl);

module.exports = PasswordRouter;
