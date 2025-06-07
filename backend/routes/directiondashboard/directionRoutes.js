const directionRooutes = require('express').Router();
const {getallcentralsperformanceCtrl,getmaintenancedefectiveequipementalarmsCtrl, getallcentralsCtrl} = require('../../controllers/directiondashboard/directionCtrl');

const {verifydirectionemployee} = require('../../middleware/verifyToken');
const { getallCentralsnameandid } = require('../../model/central');

directionRooutes.route('/getcentralsperformanceandperiode').get(verifydirectionemployee,getallcentralsperformanceCtrl);
directionRooutes.route('/defeq-alarms-maintenance/byperiode').get(verifydirectionemployee , getmaintenancedefectiveequipementalarmsCtrl);
//i did it in here becasue of an error that i couldnt find
directionRooutes.route('/allcentrals').get(verifydirectionemployee,async(req,res)=>{ const allcentral = await getallCentralsnameandid();
    return res.status(200).json({
       success: true,
       data: allcentral
     });});
module.exports = directionRooutes;