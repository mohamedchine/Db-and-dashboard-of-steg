const db = require("../config/db");
const addalarm = async ({ turbine_id, reportid, alarm_code, description, happened_at, resolved_at }) => {
  const [result] = await db.execute(
    "INSERT INTO alarms (turbine_id, reportid, alarm_code, description, status, happened_at, resolved_at) VALUES (?, ?, ?, ?, ?, ?, ?)", // 7 parameters
    [
      turbine_id,
      reportid,
      alarm_code,
      description,
      resolved_at ? 'Resolved' : 'Active',
      happened_at || new Date(),
      resolved_at || null
      // Removed extra comma here
    ]
  );

  const insertedId = result.insertId;

  const [rows] = await db.execute("SELECT * FROM alarms WHERE id = ?", [insertedId]);

  return rows[0];
};

const findalarmbyid = async (id) => {
  const [rows] = await db.execute("select * from alarms where id = ?", [id]);
  if (rows.length == 0) return -1;
  return rows[0]; 
}
const deletealarm = async(id)=>{
    await db.execute("delete from alarms where id =?", [id]);
}
const getallunresolvedalarms = async (centralid) => {
  const [rows] = await db.execute(
    `SELECT *
     FROM alarms
     WHERE reportid IN (
         SELECT id FROM report
         WHERE central_id = ?
     )
     AND status = 'Active'
     ORDER BY created_at ASC`,
    [centralid]
  );

  return rows;
};

const updateAlarmStatus = async (id,resolvedat, status) => {
  await db.execute(
    "UPDATE alarms SET status = ? , resolved_at =? WHERE id = ?",
    [status,resolvedat,id]
  );
};


const gettodaysalarmsbycentral = async (centralid) => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0); // Start of today
  
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999); // End of today

  const [rows] = await db.execute(`
    SELECT alarms.* 
    FROM alarms, report
    WHERE alarms.reportid = report.id
    AND report.central_id = ?
    AND alarms.created_at BETWEEN ? AND ?
    ORDER BY alarms.created_at DESC
  `, [centralid, todayStart, todayEnd]);

  return rows.length === 0 ? -1 : rows;
};
module.exports = { addalarm,findalarmbyid , deletealarm ,getallunresolvedalarms ,updateAlarmStatus,gettodaysalarmsbycentral};