const performanceRouter = require('express').Router();
const {addPerformanceCtrl,getPerformanceCtrl} = require('../../controllers/centraldashboard/performanceController');
const {validatecentralid,validateturbineid} =  require('../../middleware/central');
const { verify_centralemployee_and_his_central } = require('../../middleware/verifyToken');



performanceRouter.route('/:centralid/:turbineid' ).post( validatecentralid ,validateturbineid, verify_centralemployee_and_his_central ,addPerformanceCtrl);

performanceRouter.route('/get/:centralid/:turbineid').post(validatecentralid,verify_centralemployee_and_his_central,getPerformanceCtrl);




module.exports = performanceRouter;