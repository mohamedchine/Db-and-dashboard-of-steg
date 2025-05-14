const { verifygroupementemployee } = require('../../middleware/verifyToken');
const {getcentralsdatabyperiodeCtrl} = require('../../controllers/groupement/groupementCtrl');
const groupementRouter = require('express').Router();
groupementRouter.route('/centralsdata/byperiode').get(
    verifygroupementemployee ,getcentralsdatabyperiodeCtrl
  
)





module.exports = groupementRouter;