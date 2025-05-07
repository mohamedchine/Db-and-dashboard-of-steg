const {findreportbyid} = require("../model/report");
const {findalarmbyid}=require("../model/alarms");
//to verify if the report id is valid 
const validatereportid = async(req,res,next)=>{
    const reportid = req.params.reportid;
    
    if(!isNaN(reportid)){
       const report = await findreportbyid(reportid);
       if(report != -1){
        
           return next();
       }
    }
    return res.status(404).json({ message: "invalid reportid" });
}

//validate alarm id and put the report id in the req.params for later use
const validatealarmid = async(req,res,next)=>{
    const alarmid = req.params.alarmid ; 
    if(!isNaN(alarmid)){
        const alarm = await findalarmbyid(alarmid);
        if(alarm != -1){
            req.params.reportid = alarm.reportid ; 
            req.alarm = alarm ;
            return next();
        }
     }
     return res.status(404).json({ message: "invalid alarmid" });
}

module.exports = {
    validatereportid,validatealarmid
}