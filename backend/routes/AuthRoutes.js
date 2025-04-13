const AuthRouter = require('express').Router();
const  {registerCtrl,verifyAccountCtrl,loginCtrl,logoutCtrl}  = require('../controllers/AuthControllers')
AuthRouter.post('/register' ,registerCtrl )
AuthRouter.get('/verify-email',verifyAccountCtrl);
//rate limit to do  reset password
AuthRouter.post('/login' , loginCtrl); 
AuthRouter.post('/logout',logoutCtrl);
module.exports = AuthRouter;