const { addalarm ,deletealarm,getallunresolvedalarms} = require("../../model/alarms");
const { validateAddAlarm } = require("../../utils/dailyreportValidation");
const {record_activity}= require("../../utils/activitylogs");
const addalarmCtrl = async (req, res) => {
   //validation of the data
   const { error } = validateAddAlarm(req.body);
  
   if (error) {
     return res.status(400).json({message: error.details[0].message});
   }
   
  
   const addedalarm =   await addalarm({
       ...req.body,
       reportid: req.params.reportid 
     });
    await record_activity(req, "add", "alarms", null, "added an alarm");
     
     return res.status(201).json({ message: "Successfully added alarm" , addedalarm :addedalarm });
  
};


const deletealarmCtrl = async(req,res)=>{
      await deletealarm (req.params.alarmid) ;
      await record_activity(req, "delete", "alarms", null, "deleted an alarm");
      return res.status(201).json({ message: "Successfully deleted alarm" });
}


const getunresolvedalarmsCtrl = async(req,res)=>{
    const unresolvedalarms = await getallunresolvedalarms(req.params.centralid) ;
    return res.status(201).json({ message: "Successfully fetched unresolved alarms", unresolvedalarms });

}



const getallalarmsbycentralCtrl= async(req,res)=>{
  
}

module.exports = {
  addalarmCtrl , deletealarmCtrl,getunresolvedalarmsCtrl,getallalarmsbycentralCtrl
};