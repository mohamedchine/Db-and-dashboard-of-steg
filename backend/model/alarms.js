const db = require("../config/db");
const addalarm = async ({ turbine_id, central_id, alarm_code, description, happened_at, resolved_at }) => {
  const [result] = await db.execute(
    "INSERT INTO alarms (turbine_id, central_id, alarm_code, description, status, happened_at, resolved_at) VALUES (?, ?, ?, ?, ?, ?, ?)", // 7 parameters
    [
      turbine_id,
      central_id,
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




const getunresolvedalarms = async (centralid, page = 1, limit = 10, turbine_id = null) => {
  const offset = (page - 1) * limit;

  let query = `
    SELECT *
    FROM alarms
    WHERE central_id = ?
      AND status = 'Active'
  `;

  const params = [centralid];

  if (turbine_id) {
    query += ` AND turbine_id = ? `;
    params.push(turbine_id);
  }

  query += ` ORDER BY created_at ASC LIMIT ? OFFSET ? `;
  params.push(limit, offset);

  const [rows] = await db.execute(query, params);
  return rows;
};

const updateAlarmStatus = async (id,resolvedat, status) => {
  await db.execute(
    "UPDATE alarms SET status = ? , resolved_at =? WHERE id = ?",
    [status,resolvedat,id]
  );
};
const getAllUnresolvedAlarms = async (central_id, turbine_id = null) => {
  let query = `
    SELECT *
    FROM alarms
    WHERE central_id = ?
      AND status = 'Active'
  `;

  const params = [central_id];

  if (turbine_id) {
    query += ` AND turbine_id = ? `;
    params.push(turbine_id);
  }

  query += ` ORDER BY created_at ASC`;

  const [rows] = await db.execute(query, params);

  return rows;
};

const getresolvedalarms = async (centralid, page = 1, limit = 10, turbine_id = null) => {
  const offset = (page - 1) * limit;

  let query = `
    SELECT *
    FROM alarms
    WHERE central_id = ?
      AND status = 'Resolved'
  `;

  const params = [centralid];

  if (turbine_id) {
    query += ` AND turbine_id = ? `;
    params.push(turbine_id);
  }

  query += ` ORDER BY created_at ASC LIMIT ? OFFSET ? `;
  params.push(limit, offset);

  const [rows] = await db.execute(query, params);
  return rows;
};


const getpendingalarms = async (centralid, page = 1, limit = 10, turbine_id = null) => {
  const offset = (page - 1) * limit;

  let query = `
    SELECT *
    FROM alarms
    WHERE central_id = ?
      AND status = 'Pending'
  `;

  const params = [centralid];

  if (turbine_id) {
    query += ` AND turbine_id = ? `;
    params.push(turbine_id);
  }

  query += ` ORDER BY created_at ASC LIMIT ? OFFSET ? `;
  params.push(limit, offset);

  const [rows] = await db.execute(query, params);
  return rows;
};



const getalarmsbyperiodeandcentralid =  async(centralid , startdate, enddate) => {
  
} 




module.exports = { addalarm,findalarmbyid , deletealarm ,getunresolvedalarms ,updateAlarmStatus,getresolvedalarms  , getpendingalarms,getAllUnresolvedAlarms,getalarmsbyperiodeandcentralid};