const { verifygroupementemployee } = require('../../middleware/verifyToken');
const {getcentralsdatabyperiodeCtrl , getmaintenancedefectiveequipementalarmsCtrl, getcentralsbygroupementidctrl} = require('../../controllers/groupement/groupementCtrl');

const groupementRouter = require('express').Router();
groupementRouter.route('/centralsdata/byperiode').post(
    verifygroupementemployee ,
        getcentralsdatabyperiodeCtrl
  
)
groupementRouter.route('/defeq-alarms-maintenance/byperiode').post(
    verifygroupementemployee, getmaintenancedefectiveequipementalarmsCtrl
   
)


groupementRouter.get('/supervisedcentrals',verifygroupementemployee, getcentralsbygroupementidctrl
)

module.exports = groupementRouter;