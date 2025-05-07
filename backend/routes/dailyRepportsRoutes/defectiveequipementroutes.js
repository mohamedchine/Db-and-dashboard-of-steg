const {verify_centralemployee_and_his_report,verify_centralemployee_and_his_central,verifygroupementemployee} = require('../../middleware/verifyToken');
const {validatereportid,validatealarmid} = require('../../middleware/dailyreport');
const {adddefectiveequipementCtrl} = require('../../controllers/dailyRepportsControllers.js/defectiveequipementsctrls') ;
const defectiveequipementRouter = require('express').Router();





defectiveequipementRouter.route('/add/:reportid').post(validatereportid,verify_centralemployee_and_his_report, adddefectiveequipementCtrl);



module.exports = defectiveequipementRouter;