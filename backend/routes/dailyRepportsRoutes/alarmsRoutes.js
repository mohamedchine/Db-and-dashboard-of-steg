//in this file ive only done the alarms routes that are for central employee
const alarmRouter = require('express').Router();
const {addalarmCtrl,deletealarmCtrl,getunresolvedalarmsCtrl,gettodaysalarmsbycentralCtrl,getAlarmsCtrl} = require('../../controllers/dailyRepportsControllers.js/alarmsControllers') ;
const {validatereportid,validatealarmid} = require('../../middleware/dailyreport');
const {verify_centralemployee_and_his_report,verify_centralemployee_and_his_central,verifygroupementemployee} = require('../../middleware/verifyToken');
//post alarms central employee 
  


//just central employee can add alarm to his report  and he can add to only his central report

alarmRouter.route('/add/:reportid').post(validatereportid ,verify_centralemployee_and_his_report , addalarmCtrl);



//delete alarm access garanted only to alarm within the user central dailyreport
alarmRouter.route('/delete/:alarmid').delete(validatealarmid , verify_centralemployee_and_his_report, deletealarmCtrl);


//if he wants to add new one he need to see if somoene added it or not
//get all unresolved alarms for a central only user of that central can do that 
alarmRouter.route('/unresolved/:centralid').get(verify_centralemployee_and_his_central, getunresolvedalarmsCtrl);


//active and unactive better 
alarmRouter.route('/unresolvedandtoday/:centralid').get(verify_centralemployee_and_his_central, getAlarmsCtrl);



alarmRouter.route('/today/:centralid').get(verify_centralemployee_and_his_central, gettodaysalarmsbycentralCtrl);


module.exports = alarmRouter;