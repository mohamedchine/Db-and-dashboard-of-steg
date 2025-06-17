const { addalarm ,deletealarm,getunresolvedalarms,getresolvedalarms,getpendingalarms, findalarmbyid} = require("../../model/alarms");
const { findmaintenancebyalarmid, deleteMaintenance } = require("../../model/maintenance");
const { addactivitylog } = require("../../model/activitylogs");
const { validateAddAlarm } = require("../../utils/dailyreportValidation");

const addalarmCtrl = async (req, res) => {
  if(req.body.happened_at && req.body.resolved_at && req.body.happened_at>req.body.resolved_at) return res.status(400).json({message: "resolved_at must be greater than happened_at"}) ;
   //validation of the data
   if (req.body.happened_at && new Date(req.body.happened_at) > new Date()) {
    return res.status(400).json({ message: "happened_at cannot be in the future" });
  }

  // Check if resolved_at is in the future
  if (req.body.resolved_at && new Date(req.body.resolved_at) > new Date()) {
    return res.status(400).json({ message: "resolved_at cannot be in the future" });
  }
   const { error } = validateAddAlarm(req.body);
  
   if (error) {
     return res.status(400).json({message: error.details[0].message});
   }
   
  
   const addedalarm =   await addalarm({
       ...req.body,
       central_id: req.params.centralid 
     });
     const activity = {
      central_user_email: req.user.steg_email,
      action: "add",
      target_table: "alarms",
      description: "added an alarm",
      target_table_old_value: null,
      target_table_new_value: addedalarm
     }
    await addactivitylog(activity);
     
     return res.status(201).json({ message: "Successfully added the alarm" , addedalarm :addedalarm });
  
};


const deletealarmCtrl = async (req, res) => {
  // const alarm = await findalarmbyid(req.params.alarmid);
  // const today = new Date().toISOString().split('T')[0]; 
  
  // if (new Date(alarm.created_at).toISOString().split('T')[0] < today) {
  //   return res.status(403).json("This alarm wasn't added today so you can't delete it unless u request to ur groupement to delete it  ");
  // }
  const activity = {
    central_user_email: req.user.steg_email,
    action: "delete",
    target_table: "alarms",
    description: "deleted an alarm",
    target_table_old_value: req.alarm,
    target_table_new_value: null
   }
  
  const maintenance = await findmaintenancebyalarmid(req.params.alarmid);
  if(maintenance){
    await deleteMaintenance(maintenance.id);
    activity.consequence_table = "maintenance" ;
    activity.consequence_table_old_value = maintenance ;
    activity.consequence_table_new_value = null ;
  }  
  await deletealarm(req.params.alarmid);
  await addactivitylog(activity);
  return res.status(201).json({ message: "Successfully deleted alarm" });
};


const getunresolvedalarmsCtrl = async (req, res) => {
  try {
    const { centralid } = req.params;
    const { turbine } = req.query;

    const turbineId = turbine ? parseInt(turbine) : null;

    const data = await getunresolvedalarms(centralid, turbineId);

    return res.status(200).json({
      message: "Successfully fetched unresolved alarms",
      total: data.length,
      turbine_id: turbineId,
      data
    });

  } catch (error) {
    console.error("Error fetching unresolved alarms:", error);
    return res.status(500).json({ message: "Failed to fetch unresolved alarms" });
  }
};


const getresolvedAlarmCtrl = async (req, res) => {
  try {
    const { centralid } = req.params;
    const { turbine } = req.query;

    const turbineId = turbine ? parseInt(turbine) : null;

    const data = await getresolvedalarms(centralid, turbineId);

    return res.status(200).json({
      message: "Successfully fetched resolved alarms",
      total: data.length,
      turbine_id: turbineId,
      data
    });

  } catch (error) {
    console.error("Error fetching resolved alarms:", error);
    return res.status(500).json({ message: "Failed to fetch resolved alarms" });
  }
};


const getpendingAlarmCtrl = async (req, res) => {
  try {
    const { centralid } = req.params;
    const { turbine } = req.query;

    const turbineId = turbine ? parseInt(turbine) : null;

    const data = await getpendingalarms(centralid, turbineId);

    return res.status(200).json({
      message: "Successfully fetched pending alarms",
      total: data.length,
      turbine_id: turbineId,
      data
    });

  } catch (error) {
    console.error("Error fetching pending alarms:", error);
    return res.status(500).json({ message: "Failed to fetch pending alarms" });
  }
};





module.exports = {
  addalarmCtrl , deletealarmCtrl,getunresolvedalarmsCtrl,getresolvedAlarmCtrl,getpendingAlarmCtrl
};