const { findalarmbyid } = require("../model/alarms");

const verifyalarmid = async(req,res,next)=>{
    const alarmid = req.params.alarmid;
    if(!isNaN(alarmid)){
        const alarm = await findalarmbyid(alarmid);
        if(alarm){
            req.alarm = alarm;
            //for the other middleware to use the turbineid
            req.params.turbineid =alarm.turbine_id ; 
            return next();
        
        }
        return res.status(404).json({ message: "invalid alarm" });
    }
}


//to verify if the turbine of that alarm appartient to the user central

module.exports = {verifyalarmid}