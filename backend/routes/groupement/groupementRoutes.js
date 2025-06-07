const { verifygroupementemployee } = require('../../middleware/verifyToken');
const {getcentralsdatabyperiodeCtrl , getmaintenancedefectiveequipementalarmsCtrl, getcentralsbygroupementidctrl} = require('../../controllers/groupement/groupementCtrl');

const groupementRouter = require('express').Router();
groupementRouter.route('/centralsdata/byperiode').get(
    verifygroupementemployee ,
        getcentralsdatabyperiodeCtrl
  
)
groupementRouter.route('/defeq-alarms-maintenance/byperiode').get(
    verifygroupementemployee, getmaintenancedefectiveequipementalarmsCtrl
   
)


groupementRouter.get('/supervisedcentrals',verifygroupementemployee, getcentralsbygroupementidctrl
)

module.exports = groupementRouter;