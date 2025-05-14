const {verify_centralemployee_and_his_report,verify_centralemployee_and_his_central} = require('../../middleware/verifyToken');
const {validatereportid,validatedefectiveequipementid} = require('../../middleware/dailyreport');
const {adddefectiveequipementCtrl,deletedefectiveequipementCtrl,getunfixeddefectiveequipementsCtrl, getfixeddefectiveequipementsCtrl ,getpendingdefectiveequipementsCtrl} = require('../../controllers/centraldashboard/defectiveequipementsctrls') ;
const {validatecentralid} = require('../../middleware/central');
const defectiveequipementRouter = require('express').Router();





defectiveequipementRouter.route('/add/:centralid').post(validatecentralid,verify_centralemployee_and_his_central, adddefectiveequipementCtrl);

defectiveequipementRouter.route('/delete/:defectiveequipementid').delete(validatedefectiveequipementid,verify_centralemployee_and_his_central ,deletedefectiveequipementCtrl);


defectiveequipementRouter.route('/notfixed/:centralid').get(verify_centralemployee_and_his_central , getunfixeddefectiveequipementsCtrl);

defectiveequipementRouter.route('/fixed/:centralid').get(verify_centralemployee_and_his_central,getfixeddefectiveequipementsCtrl);




defectiveequipementRouter.route('/pending/:centralid').get(verify_centralemployee_and_his_central,getpendingdefectiveequipementsCtrl);
module.exports = defectiveequipementRouter;