const {verify_centralemployee_and_his_report,verify_centralemployee_and_his_central} = require('../../middleware/verifyToken');
const {validatereportid,validatedefectiveequipementid} = require('../../middleware/dailyreport');
const {adddefectiveequipementCtrl,deletedefectiveequipementCtrl,getunfixeddefectiveequipementsCtrl} = require('../../controllers/dailyRepportsControllers.js/defectiveequipementsctrls') ;
const defectiveequipementRouter = require('express').Router();





defectiveequipementRouter.route('/add/:reportid').post(validatereportid,verify_centralemployee_and_his_report, adddefectiveequipementCtrl);

defectiveequipementRouter.route('/delete/:defectiveequipementid').delete(validatedefectiveequipementid,verify_centralemployee_and_his_report ,deletedefectiveequipementCtrl);


defectiveequipementRouter.route('/notfixed/:centralid').get(verify_centralemployee_and_his_central , getunfixeddefectiveequipementsCtrl);


module.exports = defectiveequipementRouter;