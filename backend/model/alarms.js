const db = require("../config/db");
const addalarm = async ({ turbine_id, reportid, alarm_code, description, status, happened_at, resolved_at, alarm_time }) => {
  await db.execute(
    "INSERT INTO alarms (turbine_id, reportid, alarm_code, description, status, happened_at, resolved_at, alarm_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      turbine_id, 
      reportid, 
      alarm_code, 
      description, 
      status || 'Active', 
      happened_at || new Date(), 
      resolved_at || null,
      alarm_time || new Date().toTimeString().slice(0, 8)
    ]
  );
};


const findalarmbyid = async (id) => {
  const [rows] = await db.execute("select * from alarms where id = ?", [id]);
  if (rows.length == 0) return -1;
  return rows[0]; 
}
const deletealarm = async(id)=>{
    await db.execute("delete from alarms where id =?", [id]);
}
const getallunresolvedalarms = async(centralid)=>{
    const [rows] = await db.execute("select * from alarms where status = 'Active' and reportid in (select id from dailyreports where centralid = ?)", [centralid]);
    if (rows.length == 0) return -1;
    return rows;

}


module.exports = { addalarm,findalarmbyid , deletealarm ,getallunresolvedalarms};