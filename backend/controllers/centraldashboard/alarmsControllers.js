const { addalarm ,deletealarm,getunresolvedalarms,getresolvedalarms,getpendingalarms, findalarmbyid} = require("../../model/alarms");
const { findmaintenancebyalarmid, deleteMaintenance } = require("../../model/maintenance");
const { validateAddAlarm } = require("../../utils/dailyreportValidation");

const addalarmCtrl = async (req, res) => {
   //validation of the data
   const { error } = validateAddAlarm(req.body);
  
   if (error) {
     return res.status(400).json({message: error.details[0].message});
   }
   
  
   const addedalarm =   await addalarm({
       ...req.body,
       central_id: req.params.centralid 
     });
    
     
     return res.status(201).json({ message: "Successfully added alarm" , addedalarm :addedalarm });
  
};


const deletealarmCtrl = async (req, res) => {
  const alarm = await findalarmbyid(req.params.alarmid);
  const today = new Date().toISOString().split('T')[0]; 
  
  if (new Date(alarm.created_at).toISOString().split('T')[0] < today) {
    return res.status(403).json("This alarm wasn't added today so you can't delete it unless u request to ur groupement to delete it  ");
  }
  const maintenance = await findmaintenancebyalarmid(req.params.alarmid);
  if(maintenance){await deleteMaintenance(maintenance.id);}  
  await deletealarm(req.params.alarmid);
  return res.status(201).json({ message: "Successfully deleted alarm" });
};


const getunresolvedalarmsCtrl = async (req, res) => {
  try {
    const { centralid } = req.params;
    const { page, limit, turbine } = req.query;

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const turbineId = turbine ? parseInt(turbine) : null;

    const data = await getunresolvedalarms(centralid, pageNum, limitNum, turbineId);

    return res.status(200).json({
      message: "Successfully fetched unresolved alarms",
      page: pageNum,
      limit: limitNum,
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
    const { page, limit, turbine } = req.query;

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const turbineId = turbine ? parseInt(turbine) : null;

    const data = await getresolvedalarms(centralid, pageNum, limitNum, turbineId);

    return res.status(200).json({
      message: "Successfully fetched resolved alarms",
      page: pageNum,
      limit: limitNum,
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
    const { page, limit, turbine } = req.query;

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const turbineId = turbine ? parseInt(turbine) : null;

    const data = await getpendingalarms(centralid, pageNum, limitNum, turbineId);

    return res.status(200).json({
      message: "Successfully fetched pending alarms",
      page: pageNum,
      limit: limitNum,
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