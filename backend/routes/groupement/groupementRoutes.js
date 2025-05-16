const { verifygroupementemployee } = require('../../middleware/verifyToken');
const {getcentralsdatabyperiodeCtrl} = require('../../controllers/groupement/groupementCtrl');
const {getmaintenancebyperiodeandcentralid} =require('../../model/maintenance');
const groupementRouter = require('express').Router();
groupementRouter.route('/centralsdata/byperiode').get(
    verifygroupementemployee ,
        getcentralsdatabyperiodeCtrl
  
)
groupementRouter.route('/centralm/byperiode').get(
    verifygroupementemployee , async(req,res)=>{
      
const result = await getmaintenancebyperiodeandcentralid(5, '2025-05-01', '2025-05-07');
console.log(JSON.stringify(result, null, 2));
    }

)




module.exports = groupementRouter;