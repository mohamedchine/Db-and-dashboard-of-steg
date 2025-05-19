const directionRooutes = require('express').Router();
const {getallcentralsperformanceCtrl,getmaintenancedefectiveequipementalarmsCtrl,getallusersaccountsCtrl,desactivateuseracountctrl, activateuseracountctrl} = require('../../controllers/directiondashboard/directionCtrl');

const {verifydirectionemployee} = require('../../middleware/verifyToken');
directionRooutes.route('/getcentralsperformanceandperiode').get(verifydirectionemployee,getallcentralsperformanceCtrl);
directionRooutes.route('/defeq-alarms-maintenance/byperiode').get(verifydirectionemployee , getmaintenancedefectiveequipementalarmsCtrl);
directionRooutes.route('/getallusersaccounts' ).get(verifydirectionemployee, getallusersaccountsCtrl);
directionRooutes.route('/desactivate/:unittype/:id').post(verifydirectionemployee,desactivateuseracountctrl);
directionRooutes.route('/activate/:unittype/:id').post(verifydirectionemployee,activateuseracountctrl);
module.exports = directionRooutes;