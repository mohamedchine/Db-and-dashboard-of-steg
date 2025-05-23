const { getAllcentralUsersCtrl, desactivateuserCtrl, activateuserCtrl } = require('../../controllers/centraldashboard/chefCtrls');

const { verifycentralemployeeandcheffofcnetral } = require('../../middleware/verifyToken');

const chefRouter = require('express').Router();
chefRouter.route('/getAllcentralUsers/:centralid').get(verifycentralemployeeandcheffofcnetral , getAllcentralUsersCtrl);



chefRouter.route('/desactivateuser/:centralid/:usertodesactivateid').put(verifycentralemployeeandcheffofcnetral, desactivateuserCtrl);

chefRouter.route('/activate/:centralid/:usertodesactivateid').put(verifycentralemployeeandcheffofcnetral, activateuserCtrl);

module.exports = chefRouter ; 




