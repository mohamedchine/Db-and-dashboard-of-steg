const maintenanceRouter = require('express').Router();
const { addmaintenanceCtrl ,deletemaintenanceCtrl ,getundonemaintenancesCtrl,setmaintenanceenddateCtrl,gettodayandundonemaintenanceCtrl} = require('../../controllers/dailyRepportsControllers.js/maintenancectrl');
const {validatereportid,validatemaintenanceid} = require('../../middleware/dailyreport');
const {verify_centralemployee_and_his_report,verify_centralemployee_and_his_central} = require('../../middleware/verifyToken'); 

maintenanceRouter.route('/add/:reportid').post(validatereportid,verify_centralemployee_and_his_report, addmaintenanceCtrl);
maintenanceRouter.route('/delete/:maintenanceid').delete( validatemaintenanceid , verify_centralemployee_and_his_report, deletemaintenanceCtrl) ; 
maintenanceRouter.route('/ongoing/:centralid').get(verify_centralemployee_and_his_central, getundonemaintenancesCtrl);
maintenanceRouter.route('/todayandongoign/:centralid').get(verify_centralemployee_and_his_central, gettodayandundonemaintenanceCtrl);
maintenanceRouter.route('/putmaintenanceenddate/:id').put(validatemaintenanceid ,verify_centralemployee_and_his_report ,setmaintenanceenddateCtrl)

module.exports = maintenanceRouter;