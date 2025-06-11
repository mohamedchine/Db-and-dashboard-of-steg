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
  const [rows] = await db.execute("select * from alarms where id=  ?", [id]);
  if (rows.length == 0) return -1;
  return rows[0]; 
}



const deletealarm = async(id)=>{
    await db.execute("delete from alarms where id =?", [id]);
}




const getunresolvedalarms = async (centralid, turbine_id = null) => {
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

  query += ` ORDER BY created_at ASC`;

  const [rows] = await db.execute(query, params);
  return rows;
};

const updateAlarmStatus = async (id, resolvedat, status) => {
  // First, fetch the original alarm data
  const [oldAlarmResult] = await db.execute(
    "SELECT * FROM alarms WHERE id = ?",
    [id]
  );
  const oldAlarm = oldAlarmResult[0];
  
  // Update the alarm's status and resolved_at time
  await db.execute(
    "UPDATE alarms SET status = ?, resolved_at = ? WHERE id = ?",
    [status, resolvedat, id]
  );
  
  // Fetch the updated alarm data
  const [newAlarmResult] = await db.execute(
    "SELECT * FROM alarms WHERE id = ?",
    [id]
  );
  const newAlarm = newAlarmResult[0];
  
  // Return both old and new alarm data
  return {
    oldAlarm,
    newAlarm
  };
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

const getresolvedalarms = async (centralid, turbine_id = null) => {
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

  query += ` ORDER BY created_at ASC`;

  const [rows] = await db.execute(query, params);
  return rows;
};


const getpendingalarms = async (centralid, turbine_id = null) => {
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

  query += ` ORDER BY created_at ASC`;

  const [rows] = await db.execute(query, params);
  return rows;
};


const getAlarmsByPeriodAndCentralId = async (centralId, startDate, endDate) => {
  try {
    // Get alarms that either happened or were resolved during the period
    const [alarms] = await db.execute(`
      SELECT 
        a.id,
        a.turbine_id,
        a.central_id,
        a.alarm_code,
        a.description,
        a.status as original_status,
        a.happened_at,
        a.resolved_at,
        a.created_at
      FROM 
        alarms a
      WHERE 
        a.central_id = ? AND (
          (a.happened_at BETWEEN ? AND ?) OR
          (a.resolved_at BETWEEN ? AND ?)
        )
      ORDER BY a.happened_at DESC
    `, [centralId, startDate, endDate, startDate, endDate]);

    // Format date helper
    const formatDate = (dateString) => 
      dateString ? new Date(dateString).toISOString().replace('T', ' ').substring(0, 19) : null;

    // Get turbine names
    const [turbines] = await db.execute(`
      SELECT turbine_id, name FROM turbine 
      WHERE turbine_id IN (SELECT DISTINCT turbine_id FROM alarms WHERE central_id = ?)
    `, [centralId]);
    
    const turbineMap = Object.fromEntries(turbines.map(t => [t.turbine_id, t.name]));

    // Process alarms
    const processedAlarms = await Promise.all(alarms.map(async (alarm) => {
      // Get ALL maintenance fields related to this alarm
      const [maintenanceRecords] = await db.execute(`
        SELECT 
          id,
          central_id,
          kks,
          ot_number,
          description,
          type,
          related_item_type,
          related_item_id,
          start,
          end,
          created_at,
          updated_at
        FROM maintenance 
        WHERE related_item_type = 'Defective Equipment' 
          AND related_item_id = ?
          AND (
            (start <= ?) OR  /* Started before end of period */
            (end <= ?)       /* Ended before end of period */
          )
        ORDER BY start DESC
      `, [alarm.id, endDate, endDate]);

      // Determine status
      let status;
      if (alarm.resolved_at && new Date(alarm.resolved_at) >= new Date(startDate) && 
          new Date(alarm.resolved_at) <= new Date(endDate)) {
        status = 'Resolved';
      } else if (new Date(alarm.happened_at) >= new Date(startDate) && 
                new Date(alarm.happened_at) <= new Date(endDate)) {
        status = maintenanceRecords.length > 0 ? 'Pending' : 'Active';
      }

      return {
        id: alarm.id,
        turbine_id: alarm.turbine_id,
        turbine_name: turbineMap[alarm.turbine_id] || 'Unknown',
        central_id: alarm.central_id,
        alarm_code: alarm.alarm_code,
        description: alarm.description,
        status,
        happened_at: formatDate(alarm.happened_at),
        resolved_at: formatDate(alarm.resolved_at),
        created_at: formatDate(alarm.created_at),
        has_maintenance: maintenanceRecords.length > 0,
        maintenance: maintenanceRecords.map(m => ({
          id: m.id,
          central_id: m.central_id,
          kks: m.kks,
          ot_number: m.ot_number,
          description: m.description,
          type: m.type,
          related_item_type: m.related_item_type,
          related_item_id: m.related_item_id,
          start: formatDate(m.start),
          end: formatDate(m.end),
          created_at: formatDate(m.created_at),
          updated_at: formatDate(m.updated_at),
          status: m.end ? 'completed' : 'ongoing'
        }))
      };
    }));

    // Group results
    const result = {
      resolved: processedAlarms.filter(a => a.status === 'Resolved'),
      pending: processedAlarms.filter(a => a.status === 'Pending'),
      active: processedAlarms.filter(a => a.status === 'Active'),
      central: (await db.execute('SELECT name FROM central WHERE central_id = ?', [centralId]))[0]?.[0] || null,
      summary: {
        total: processedAlarms.length,
        resolved: processedAlarms.filter(a => a.status === 'Resolved').length,
        pending: processedAlarms.filter(a => a.status === 'Pending').length,
        active: processedAlarms.filter(a => a.status === 'Active').length
      }
    };

    return result;

  } catch (error) {
    console.error('Error fetching alarm data:', error);
    throw error;
  }
};
module.exports = { addalarm,findalarmbyid , deletealarm ,getunresolvedalarms ,updateAlarmStatus,getresolvedalarms  , getpendingalarms,getAllUnresolvedAlarms,getAlarmsByPeriodAndCentralId};