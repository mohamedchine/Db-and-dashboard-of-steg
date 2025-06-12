const db = require("../config/db");

const addDefectiveEquipment = async ({ 
  turbine_id, 
  kks, 
  description, 
  reported_at, 
  fixed_at,
  central_id
}) => {
  const [result] = await db.execute(
    `INSERT INTO defective_equipment 
     (central_id, turbine_id, kks, description, reported_at, fixed_at, status) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      central_id,
      turbine_id,
      kks,
      description,
      reported_at ? toISOString(reported_at) : new Date().toISOString(),//in utc
      !fixed_at ? null : fixed_at,
      !fixed_at  ? "Not Fixed" : "Fixed"
    ]
  );

  const insertedId = result.insertId;

  const [rows] = await db.execute(
    `SELECT * FROM defective_equipment WHERE id = ?`,
    [insertedId]
  );

  return rows[0]; 
};


const findDefectiveEquipmentById = async (id) => {
  const [rows] = await db.execute(
    "SELECT * FROM defective_equipment WHERE id = ?", 
    [id]
  );
  if (rows.length === 0) return -1;
  return rows[0];
};

const deleteDefectiveEquipment = async (id) => {
  await db.execute(
    "DELETE FROM defective_equipment WHERE id = ?", 
    [id]
  );
};

const getDefectiveEquipmentByTurbine = async (turbine_id) => {
  const [rows] = await db.execute(
    `SELECT * FROM defective_equipment 
     WHERE turbine_id = ? 
     ORDER BY reported_at DESC`,
    [turbine_id]
  );
  return rows.length === 0 ? -1 : rows;
};





const updateDefectiveEquipmentStatus = async (id, status, fixedat) => {
  // First, fetch the old record before updating
  const [oldEquipment] = await db.execute(
    "SELECT * FROM defective_equipment WHERE id = ?",
    [id]
  );
  
  // Update the equipment record
  await db.execute(
    "UPDATE defective_equipment SET status = ?, fixed_at = ? WHERE id = ?",
    [status, fixedat, id]
  );
  
  // Fetch the updated record
  const [updatedEquipment] = await db.execute(
    "SELECT * FROM defective_equipment WHERE id = ?",
    [id]
  );
  
  // Return both old and new data
  return {
    Old: oldEquipment[0],
    New: updatedEquipment[0]
  };
};

const getunfixeddefectiveequipments = async (centralid, turbine_id = null) => {
  let query = `
    SELECT * 
    FROM defective_equipment
    WHERE defective_equipment.status = 'Not Fixed'
      AND defective_equipment.central_id = ?
  `;
  const params = [centralid];

  if (turbine_id) {
    query += ` AND defective_equipment.turbine_id = ? `;
    params.push(turbine_id);
  }

  query += ` ORDER BY defective_equipment.created_at DESC`;

  const [rows] = await db.execute(query, params);
  return rows;
};

const getfixeddefectiveequipments = async (centralid, turbine_id = null) => {
  let query = `
    SELECT * 
    FROM defective_equipment
    WHERE defective_equipment.fixed_at IS NOT NULL
      AND defective_equipment.central_id = ?
  `;
  const params = [centralid];

  if (turbine_id) {
    query += ` AND defective_equipment.turbine_id = ? `;
    params.push(turbine_id);
  }

  query += ` ORDER BY defective_equipment.created_at DESC`;

  const [rows] = await db.execute(query, params);
  return rows;
};

const getpendingdefectiveequipments = async (centralid, turbine_id = null) => {
  let query = `
    SELECT * 
    FROM defective_equipment
    WHERE defective_equipment.status = 'Pending'
      AND defective_equipment.central_id = ?
  `;
  const params = [centralid];

  if (turbine_id) {
    query += ` AND defective_equipment.turbine_id = ? `;
    params.push(turbine_id);
  }

  query += ` ORDER BY defective_equipment.created_at DESC`;

  const [rows] = await db.execute(query, params);
  return rows;
};

const getallunfixeddefectiveequipments = async (centralid) => {
  const query = `
    SELECT * 
    FROM defective_equipment
    WHERE defective_equipment.fixed_at IS NULL
      AND defective_equipment.central_id = ?
    ORDER BY defective_equipment.created_at DESC
  `;

  const [rows] = await db.execute(query, [centralid]);
  return rows;
};




const getDefectiveEquipmentByPeriodAndCentralId = async (centralId, startDate, endDate) => {
  try {
    // Get defective equipment that either:
    // 1. Was reported during the period, OR
    // 2. Was fixed during the period
    const [defectiveEquipment] = await db.execute(`
      SELECT 
        d.id,
        d.turbine_id,
        d.central_id,
        d.kks,
        d.description,
        d.comments,
        d.status as original_status,
        d.reported_at,
        d.fixed_at,
        d.created_at
      FROM 
        defective_equipment d
      WHERE 
        d.central_id = ? AND (
          (d.reported_at BETWEEN ? AND ?) OR
          (d.fixed_at BETWEEN ? AND ?)
        )
      ORDER BY d.reported_at DESC
    `, [centralId, startDate, endDate, startDate, endDate]);

    // Format date helper
    const formatDate = (dateString) => 
      dateString ? new Date(dateString).toISOString().replace('T', ' ').substring(0, 19) : null;

    // Get turbine names
    const [turbines] = await db.execute(`
      SELECT turbine_id, name FROM turbine 
      WHERE turbine_id IN (SELECT DISTINCT turbine_id FROM defective_equipment WHERE central_id = ?)
    `, [centralId]);
    
    const turbineMap = Object.fromEntries(turbines.map(t => [t.turbine_id, t.name]));

    // Process defective equipment
    const processedEquipment = await Promise.all(defectiveEquipment.map(async (equipment) => {
      // Get ALL maintenance fields related to this equipment
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
      `, [equipment.id, endDate, endDate]);

      // Determine status
      let status;
      if (equipment.fixed_at && new Date(equipment.fixed_at) >= new Date(startDate) && 
          new Date(equipment.fixed_at) <= new Date(endDate)) {
        status = 'Fixed';
      } else if (new Date(equipment.reported_at) >= new Date(startDate) && 
                new Date(equipment.reported_at) <= new Date(endDate)) {
        status = maintenanceRecords.length > 0 ? 'Pending' : 'Not Fixed';
      }

      return {
        id: equipment.id,
        turbine_id: equipment.turbine_id,
        turbine_name: turbineMap[equipment.turbine_id] || 'Unknown',
        central_id: equipment.central_id,
        kks: equipment.kks,
        description: equipment.description,
        comments: equipment.comments,
        status,
        reported_at: formatDate(equipment.reported_at),
        fixed_at: formatDate(equipment.fixed_at),
        created_at: formatDate(equipment.created_at),
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
      fixed: processedEquipment.filter(e => e.status === 'Fixed'),
      pending: processedEquipment.filter(e => e.status === 'Pending'),
      not_fixed: processedEquipment.filter(e => e.status === 'Not Fixed'),
      central: (await db.execute('SELECT name FROM central WHERE central_id = ?', [centralId]))[0]?.[0] || null,
      summary: {
        total: processedEquipment.length,
        fixed: processedEquipment.filter(e => e.status === 'Fixed').length,
        pending: processedEquipment.filter(e => e.status === 'Pending').length,
        not_fixed: processedEquipment.filter(e => e.status === 'Not Fixed').length
      }
    };

    return result;

  } catch (error) {
    console.error('Error fetching defective equipment data:', error);
    throw error;
  }
};

module.exports = {
  getDefectiveEquipmentByPeriodAndCentralId,
  addDefectiveEquipment,
  findDefectiveEquipmentById,
  deleteDefectiveEquipment,
  getDefectiveEquipmentByTurbine,
  getunfixeddefectiveequipments,
  updateDefectiveEquipmentStatus,
  getfixeddefectiveequipments,
  getallunfixeddefectiveequipments,
  getpendingdefectiveequipments
};