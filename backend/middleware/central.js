const {findcentralbyid} = require("../model/central");
//to verify if the report id is valid 
const validatecentralid = async(req,res,next)=>{
    const centralid = req.params.centralid;
    
    if(!isNaN(centralid)){
       const report = await findcentralbyid(centralid);
       if(report != -1){
           return next();
       }
    }
    return res.status(404).json({ message: "invalid centralid" });
}
module.exports = {
    validatecentralid
}