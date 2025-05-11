const {findreportbyid} = require("../model/report");
const {findalarmbyid}=require("../model/alarms");
const { findDefectiveEquipmentById } = require("../model/defectiveequipement");
const { findMaintenanceById } = require("../model/maintenance"); 
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
const validatedefectiveequipementid = async(req,res,next)=>{
    const defectiveequipementid = req.params.defectiveequipementid ;
    if(!isNaN(defectiveequipementid)){
        const defectiveequipement = await findDefectiveEquipmentById(defectiveequipementid);
        if(defectiveequipement != -1){
            req.params.reportid = defectiveequipement.report_id ; 
            req.defectiveequipement = defectiveequipement ;
            return next();
        }
     }
     return res.status(404).json({ message: "invalid defectiveequipementid" });
}



const validatemaintenanceid = async(req, res, next) => {
    const maintenanceid = req.params.id;
    
    if(!isNaN(maintenanceid)) {
        const maintenance = await findMaintenanceById(maintenanceid);
        if(maintenance != -1) {
            req.params.reportid = maintenance.report_id; // Assuming your maintenance table has report_id column
            req.maintenance = maintenance;
            return next();
        }
    }
    return res.status(404).json({ message: "invalid maintenanceid" });
};

module.exports = {
    validatereportid,validatealarmid,validatedefectiveequipementid , validatemaintenanceid
}