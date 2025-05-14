const {findcentralbyid , findturbinebyid} = require("../model/central");
//to verify if the report id is valid 
const validatecentralid = async(req,res,next)=>{
   
    const centralid = req.params.centralid;
    
    if(!isNaN(centralid)){
         const central =await findcentralbyid(centralid);
         if(central!=-1){
            req.central = central;
            return next();
         }
    }
    return res.status(404).json({ message: "invalid centralid" });
}

const validateturbineid = async(req,res,next)=>{
    const centralid = req.params.centralid;
    const turbineid = req.params.turbineid;
    if(!isNaN(turbineid)){
        const turbine = await findturbinebyid(centralid , turbineid);
        if(turbine!=-1){
            req.turbine = turbine;
            return next();
        }
        return res.status(404).json({ message: "invalid turbine" });
    }
}
module.exports = {
    validatecentralid,validateturbineid
}