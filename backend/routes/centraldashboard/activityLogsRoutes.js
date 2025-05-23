const { getallactivitiesCtrl } = require('../../controllers/centraldashboard/activitylogsctrls');
const { verify_centralemployee_and_his_central } = require('../../middleware/verifyToken');

const activitylogRouter = require('express').Router();

activitylogRouter.route('/:centralid').get(verify_centralemployee_and_his_central ,getallactivitiesCtrl )





module.exports = activitylogRouter;
