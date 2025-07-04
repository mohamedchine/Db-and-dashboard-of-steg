const db = require("../config/db");
const {findalarmbyid} = require('../model/alarms');
const {findDefectiveEquipmentById} = require('./defectiveequipement')
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
        body.start || new Date().toISOString().slice(0, 19).replace('T', ' '),
        body.end || null
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
  // First, fetch the existing record before deletion
  const [oldMaintenanceResult] = await db.execute(
    "SELECT * FROM maintenance WHERE id = ?",
    [id]
  );
  
  // Get the first row (the maintenance record)
  const oldMaintenance = oldMaintenanceResult.length > 0 ? oldMaintenanceResult[0] : null;
  
  // Delete the record
  await db.execute(
    "DELETE FROM maintenance WHERE id = ?",
    [id]
  );
  
  // Return the old record and null for the new (since it's deleted)
  return {
    Old: oldMaintenance,
    New: null
  };
};


const getUndoneMaintenance = async (centralId, turbine_id = null) => {
  let query = `
    SELECT * 
    FROM maintenance 
    WHERE central_id = ? 
      AND end IS NULL
  `;

  const params = [centralId];
  query += ` ORDER BY created_at DESC`;

  const [rows] = await db.execute(query, params);
  
  // Fetch related items for each maintenance record
  const maintenanceWithRelatedItems = [];
  
  for (const maintenance of rows) {
    let relatedItem = null;
    
    if (maintenance.related_item_type === 'Alarm' && maintenance.related_item_id) {
      const [alarmRows] = await db.execute(
        'SELECT * FROM alarms WHERE id = ?',
        [maintenance.related_item_id]
      );
      relatedItem = alarmRows[0] || null;
    } else if (maintenance.related_item_type === 'Defective Equipment' && maintenance.related_item_id) {
      const [equipmentRows] = await db.execute(
        'SELECT * FROM defective_equipment WHERE id = ?',
        [maintenance.related_item_id]
      );
      relatedItem = equipmentRows[0] || null;
    }
    
    maintenanceWithRelatedItems.push({
      ...maintenance,
      related_item: relatedItem
    });
  }

  // Filter by turbine_id if provided
  if (turbine_id) {
    return maintenanceWithRelatedItems.filter(maintenance => 
      maintenance.related_item && maintenance.related_item.turbine_id === turbine_id
    );
  }

  return maintenanceWithRelatedItems;
};

const getDoneMaintenance = async (centralId, turbine_id = null) => {
  let query = `
    SELECT * 
    FROM maintenance 
    WHERE central_id = ? 
      AND end IS NOT NULL
  `;

  const params = [centralId];
  query += ` ORDER BY created_at DESC`;

  const [rows] = await db.execute(query, params);
  
  // Fetch related items for each maintenance record
  const maintenanceWithRelatedItems = [];
  
  for (const maintenance of rows) {
    let relatedItem = null;
    
    if (maintenance.related_item_type === 'Alarm' && maintenance.related_item_id) {
      const [alarmRows] = await db.execute(
        'SELECT * FROM alarms WHERE id = ?',
        [maintenance.related_item_id]
      );
      relatedItem = alarmRows[0] || null;
    } else if (maintenance.related_item_type === 'Defective Equipment' && maintenance.related_item_id) {
      const [equipmentRows] = await db.execute(
        'SELECT * FROM defective_equipment WHERE id = ?',
        [maintenance.related_item_id]
      );
      relatedItem = equipmentRows[0] || null;
    }
    
    maintenanceWithRelatedItems.push({
      ...maintenance,
      related_item: relatedItem
    });
  }

  // Filter by turbine_id if provided
  if (turbine_id) {
    return maintenanceWithRelatedItems.filter(maintenance => 
      maintenance.related_item && maintenance.related_item.turbine_id === turbine_id
    );
  }

  return maintenanceWithRelatedItems;
};




const updateMaintenanceEndDate = async (id, endDate) => {
  await db.execute(
    "UPDATE maintenance SET end = ? WHERE id = ?",
    [endDate || null, id]
  );
   const updatedmaintenance =   findMaintenanceById(id);
   return updatedmaintenance;
};

const findmaintenancebyalarmid = async (alarmid) => {
  const [rows] = await db.execute(
    "SELECT * FROM maintenance WHERE related_item_type = 'Alarm' AND related_item_id = ?", 
    [alarmid]
  );
  return rows[0] || null;  
};
const findMaintenanceByDefectiveEquipmentId = async (equipmentId) => {
  const [rows] = await db.execute(
    "SELECT * FROM maintenance WHERE related_item_type = 'Defective Equipment' AND related_item_id = ?",
    [equipmentId]
  );
  return rows[0] || null;
};
// this gets u the maintenance that ended in that periode as finished and the ones that started in that periode and didnt finish as unfinished 
const getMaintenanceByPeriodAndCentralId = async(centralId, start, end) => {
  try {
    // First, retrieve maintenance records that fall within the specified period
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
    `, [start, end, centralId, start, end, start, end, start, end]);

    // Helper function to format date
    const formatDate = (dateString) => {
      if (!dateString) return null;
      const date = new Date(dateString);
      return date.toISOString().replace('T', ' ').substring(0, 19);
    };

    const processedRecords = [];

    // Process each record
    for (const record of maintenanceRecords) {
      let relatedItem = null;
      let turbineId = null;

      // Check if related_item_type and related_item_id are valid
      if (record.related_item_type && record.related_item_id) {
        if (record.related_item_type === 'Alarm') {
          // Use the helper function to get alarm details
          const alarm = await findalarmbyid(record.related_item_id);
          
          if (alarm !== -1) {
            // Keep the alarm object as is, just add a type field
            relatedItem = {
              ...alarm,
              type: 'Alarm'
            };
            turbineId = alarm.turbine_id;
          }
        } else if (record.related_item_type === 'Defective Equipment') {
          // Use the helper function to get defective equipment details
          const equipment = await findDefectiveEquipmentById(record.related_item_id);
          
          if (equipment !== -1) {
            // Keep the equipment object as is, just add a type field
            relatedItem = {
              ...equipment,
              type: 'Defective Equipment'
            };
            turbineId = equipment.turbine_id;
          }
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
        related_item: relatedItem
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

module.exports = { findMaintenanceByDefectiveEquipmentId ,addMaintenance,findMaintenanceById ,findmaintenancebyalarmid,deleteMaintenance , getUndoneMaintenance,updateMaintenanceEndDate ,getDoneMaintenance,getMaintenanceByPeriodAndCentralId};

