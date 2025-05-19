const { verifygroupementemployee } = require('../../middleware/verifyToken');
const {getcentralsdatabyperiodeCtrl , getmaintenancedefectiveequipementalarmsCtrl} = require('../../controllers/groupement/groupementCtrl');

const groupementRouter = require('express').Router();
groupementRouter.route('/centralsdata/byperiode').get(
    verifygroupementemployee ,
        getcentralsdatabyperiodeCtrl
  
)
groupementRouter.route('/defeq-alarms-maintenance/byperiode').get(
    verifygroupementemployee, getmaintenancedefectiveequipementalarmsCtrl
   
)




module.exports = groupementRouter;