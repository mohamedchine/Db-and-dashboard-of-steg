const AuthRouter = require('express').Router();
const  {registerCtrl,verifyAccountCtrl,loginCtrl}  = require('../controllers/AuthControllers')
AuthRouter.post('/register' ,registerCtrl )
AuthRouter.get('/verify',verifyAccountCtrl);
AuthRouter.post('/login' , loginCtrl)
module.exports = AuthRouter;