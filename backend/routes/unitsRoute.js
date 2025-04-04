const unitsRouter = require('express').Router();
const db = require('../config/db');
unitsRouter.get('/',async(req,res)=>{
    const centrals = await db.execute('select * from central');
    const groups = await db.execute('select * from groupement');
    const direction = await db.execute('select * from direction');
    return res.status(200).json({centrals : centrals[0] , groups : groups[0], direction : direction[0]});
});
module.exports = unitsRouter;