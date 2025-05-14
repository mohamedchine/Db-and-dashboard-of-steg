const AuthRouter = require('express').Router();
const  {registerCtrl,verifyAccountCtrl,loginCtrl,logoutCtrl,checkauthctrl}  = require('../controllers/AuthControllers')

//missing recaptcha and rate limiter
AuthRouter.post('/register' ,registerCtrl )
AuthRouter.get('/verify-email',verifyAccountCtrl);

AuthRouter.post('/login' , loginCtrl); 
//we added the check authctrl becasue we have the token as a cookie that is not accessible via js so how do we first check if the user have a token or not when we cant access the token via js in the frontend we check it by requesting the server to check if theres a token or not
AuthRouter.get('/check',checkauthctrl);
AuthRouter.post('/logout',logoutCtrl);
module.exports = AuthRouter;