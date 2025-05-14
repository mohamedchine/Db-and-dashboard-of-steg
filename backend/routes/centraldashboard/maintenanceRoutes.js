const maintenanceRouter = require('express').Router();

const { addmaintenanceCtrl ,deletemaintenanceCtrl ,getundonemaintenancesCtrl,setmaintenanceenddateCtrl, getdoneMaintenanceCtrl} = require('../../controllers/centraldashboard/maintenancectrl');
const { validatecentralid } = require('../../middleware/central');
const {validatemaintenanceid} = require('../../middleware/dailyreport');
const {verify_centralemployee_and_his_central} = require('../../middleware/verifyToken'); 

maintenanceRouter.route('/add/:centralid').post(validatecentralid,verify_centralemployee_and_his_central, addmaintenanceCtrl);
maintenanceRouter.route('/delete/:maintenanceid').delete( validatemaintenanceid , verify_centralemployee_and_his_central, deletemaintenanceCtrl) ; 
maintenanceRouter.route('/ongoing/:centralid').get(verify_centralemployee_and_his_central, getundonemaintenancesCtrl);
maintenanceRouter.route('/finished/:centralid').get(verify_centralemployee_and_his_central , getdoneMaintenanceCtrl);
maintenanceRouter.route('/putmaintenanceenddate/:id').put(validatemaintenanceid ,verify_centralemployee_and_his_central ,setmaintenanceenddateCtrl)

module.exports = maintenanceRouter;