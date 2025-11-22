//in this file ive only done the alarms routes that are for central employee
const alarmRouter = require('express').Router();
const {addalarmCtrl,deletealarmCtrl,getunresolvedalarmsCtrl,getpendingAlarmCtrl,getresolvedAlarmCtrl} = require('../../controllers/centraldashboard/alarmsControllers') ;
const {validatealarmid} = require('../../middleware/dailyreport');
const{validatecentralid} = require('../../middleware/central');
const {verify_centralemployee_and_his_central} = require('../../middleware/verifyToken');
//post alarms central employee 
  


//just central employee can add alarm to his central 
alarmRouter.route('/add/:centralid').post(validatecentralid ,verify_centralemployee_and_his_central , addalarmCtrl);



//delete alarm access garanted only to alarm within the user central 
alarmRouter.route('/delete/:alarmid').delete(validatealarmid ,verify_centralemployee_and_his_central ,  deletealarmCtrl);


// get resolved alarms for central by page number 
alarmRouter.route('/unresolved/:centralid').get(verify_centralemployee_and_his_central, getunresolvedalarmsCtrl);


//active and unactive better 
alarmRouter.route('/resolved/:centralid').get(verify_centralemployee_and_his_central, getresolvedAlarmCtrl);



//pending or in maintenance
alarmRouter.route('/pending/:centralid').get(verify_centralemployee_and_his_central, getpendingAlarmCtrl);

module.exports = alarmRouter;