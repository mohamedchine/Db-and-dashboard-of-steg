const { addalarm ,deletealarm,getallunresolvedalarms,gettodaysalarmsbycentral} = require("../../model/alarms");
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



const gettodaysalarmsbycentralCtrl = async (req, res) => {
  try {
    const centralId = req.params.centralid;
    
    const alarms = await gettodaysalarmsbycentral(centralId);
    
    if (alarms === -1) {
      return res.status(200).json([]); 
    }
    
    return res.status(200).json(alarms);
    
  } catch (error) {
    console.error("Error fetching today's alarms:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const getAlarmsCtrl = async (req, res) => {
  try {
    const centralId = req.params.centralid;
    
    // Get unresolved alarms
    const unresolved = await getallunresolvedalarms(centralId);
    
    // Get today's alarms
    let today = await gettodaysalarmsbycentral(centralId);
    if (today === -1) today = [];
    
    // Send both together
    res.status(200).json({
      unresolved,
      today
    });
    
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  addalarmCtrl , deletealarmCtrl,getunresolvedalarmsCtrl,gettodaysalarmsbycentralCtrl,getAlarmsCtrl
};