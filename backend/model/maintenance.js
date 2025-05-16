const db = require("../config/db");

const addMaintenance = async ({ body, params }) => {
    const [result] = await db.execute(
      `INSERT INTO maintenance 
       (central_id, kks, ot_number, description, type, 
        related_item_type, related_item_id, start, end) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        params.centralid,  
        body.kks,
        body.ot_number,
        body.description,
        body.type,
        body.related_item_type,
        body.related_item_id,
        body.start,
        body.end || body.end || null
      ]
    );
  
    const [rows] = await db.execute(
      "SELECT * FROM maintenance WHERE id = ?",
      [result.insertId]
    );
  
    return rows[0];
  };


  // In your maintenance model file
const findMaintenanceById = async (id) => {
  const [rows] = await db.execute(
      "SELECT * FROM maintenance WHERE id = ?", 
      [id]
  );
  return rows.length === 0 ? -1 : rows[0];
};



const deleteMaintenance = async (id) => {
  await db.execute(
    "DELETE FROM maintenance WHERE id = ?",
    [id]
  );
};


const getUndoneMaintenance = async (centralId, page = 1, limit = 10, turbine_id = null) => {
  const offset = (page - 1) * limit;

  let query = `
    SELECT * 
    FROM maintenance
    WHERE central_id = ?
      AND end IS NULL
  `;

  const params = [centralId];

  if (turbine_id) {
    query += ` AND turbine_id = ? `;
    params.push(turbine_id);
  }

  query += ` ORDER BY start ASC LIMIT ? OFFSET ?`;
  params.push(limit, offset);

  const [rows] = await db.execute(query, params);
  return rows;
};



const getDoneMaintenance = async (centralId, page = 1, limit = 10, turbine_id = null) => {
  const offset = (page - 1) * limit;

  let query = `
    SELECT * 
    FROM maintenance 
   
    WHERE central_id = ?
      AND end IS NOT NULL
  `;

  const params = [centralId];

  if (turbine_id) {
    query += ` AND turbine_id = ? `;
    params.push(turbine_id);
  }

  query += ` ORDER BY end DESC LIMIT ? OFFSET ?`;
  params.push(limit, offset);

  const [rows] = await db.execute(query, params);
  return rows;
};

const updateMaintenanceEndDate = async (id, endDate) => {
  await db.execute(
    "UPDATE maintenance SET end = ? WHERE id = ?",
    [endDate || null, id]
  );
   const updatedmaintenance =   findMaintenanceById(id);
   return updatedmaintenance;
};


// this gets u the maintenance that ended in that periode as finished and the ones that started in that periode and didnt finish as unfinished 
const getmaintenancebyperiodeandcentralid = async(centralid , start , end)=>{
    try {
      
      const [maintenanceRecords] = await db.execute(`
        SELECT 
          m.id,
          m.central_id,
          m.kks,
          m.ot_number,
          m.description,
          m.type,
          m.related_item_type,
          m.related_item_id,
          m.start,
          m.end,
          m.created_at,
          CASE
            WHEN m.end IS NOT NULL AND m.end BETWEEN ? AND ? THEN 'finished'
            ELSE 'unfinished'
          END AS status
        FROM maintenance m
        WHERE 
          m.central_id = ? AND (
            (m.start BETWEEN ? AND ?) OR
            (m.end BETWEEN ? AND ?) OR
            (m.start <= ? AND (m.end IS NULL OR m.end >= ?))
          )
        ORDER BY m.start DESC
      `, [start, end, centralid, start, end, start, end, start, end]);
  
      // Helper function to format date
      const formatDate = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toISOString().replace('T', ' ').substring(0, 19);
      };
  
      const processedRecords = [];
  
      // Sequentially process each record
      for (const record of maintenanceRecords) {
        let relatedItemDetails = null;
        let turbineId = null;
  
        if (record.related_item_type === 'Alarm' && record.related_item_id) {
          const [alarmDetails] = await db.execute(`
            SELECT alarm_code, description, status, happened_at, resolved_at, turbine_id
            FROM alarms
            WHERE id = ?
          `, [record.related_item_id]);
  
          if (alarmDetails.length > 0) {
            relatedItemDetails = {
              type: 'Alarm',
              ...alarmDetails[0]
            };
            turbineId = alarmDetails[0].turbine_id;
          }
        } else if (record.related_item_type === 'Defective Equipment' && record.related_item_id) {
          const [equipmentDetails] = await db.execute(`
            SELECT kks, description, status, reported_at, fixed_at, turbine_id
            FROM defective_equipment
            WHERE id = ?
          `, [record.related_item_id]);
  
          if (equipmentDetails.length > 0) {
            relatedItemDetails = {
              type: 'Defective Equipment',
              ...equipmentDetails[0]
            };
            turbineId = equipmentDetails[0].turbine_id;
          }
        }
  
        let turbineName = 'Unknown';
        if (turbineId) {
          const [turbineResult] = await db.execute(`
            SELECT name FROM turbine WHERE turbine_id = ?
          `, [turbineId]);
  
          if (turbineResult.length > 0) {
            turbineName = turbineResult[0].name;
          }
        }
  
        processedRecords.push({
          id: record.id,
          central_id: record.central_id,
          turbine_id: turbineId,
          turbine_name: turbineName,
          kks: record.kks,
          ot_number: record.ot_number,
          description: record.description,
          type: record.type,
          start: formatDate(record.start),
          end: formatDate(record.end),
          created_at: formatDate(record.created_at),
          status: record.status,
          related_item: relatedItemDetails
        });
      }
  
      // Group records by status
      return {
        finished: processedRecords.filter(record => record.status === 'finished'),
        unfinished: processedRecords.filter(record => record.status === 'unfinished')
      };
    } catch (error) {
      console.error('Error fetching maintenance data:', error);
      throw error;
    }
  };


module.exports = { addMaintenance,findMaintenanceById ,deleteMaintenance , getUndoneMaintenance,updateMaintenanceEndDate ,getDoneMaintenance,getmaintenancebyperiodeandcentralid};

