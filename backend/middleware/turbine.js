const { findturbinebyid } = require('../model/turbine');
const {
   verifyCentralEmployee,
   
  
} = require('./verifyToken');


const verifycentralemployee_and_his_centralandturbine = async(req,res,next)=>{
    const turbineid = req.params.turbineid;
    verifyCentralEmployee(req,res,async()=>{
     if(!isNaN(turbineid)){
         const turbine = await findturbinebyid(turbineid);
         
           if(turbine?.central_id == req.user.central_id){
             return next();
           }
           return  res.status(403).json({message : "wrong turbine id"}) ; 
        }
 })
    
}



const verify_turbine_id = async(req,res,next)=>{
  let turbineid ; 
if(req.params.turbineid) {
  turbineid = req.params.turbineid;
}else if(req.query.turbineid){
  turbineid = req.body.turbineid;}
  
  if(!isNaN(turbineid)){
    const turbine = await findturbinebyid(turbineid);
    
      if(turbine?.central_id == req.user.central_id){
        return next();
      }
      return  res.status(403).json({message : "invalid turbine id"}) ; 
   }
}



const puttheturbinesofthatcentralinthereqparams = async(req,res,next)=>{
  const centralid = req.user.central_id;
  const turbines = await findturbinesbycentralid(centralid);
  req.turbines = turbines;
}


const verifyturbinequery = async(req,res,next)=> {
  if(!isNaN(req.query.turbineid)){
    const turbine = await findturbinebyid(req.query.turbineid);
  }
}
module.exports = {
  verifycentralemployee_and_his_centralandturbine,verify_turbine_id
}
