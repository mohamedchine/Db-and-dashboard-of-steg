const TurbinesRouter = require('express').Router();
const db = require('../config/db');
const {validatecentralid} = require('../middleware/central');

TurbinesRouter.route('/:centralid').get(validatecentralid , async(req,res)=>{
    const turbines = await db.execute('select * from turbine where central_id = ?',[req.params.centralid]);
    return res.status(200).json({turbines : turbines[0]});
});
module.exports = TurbinesRouter;