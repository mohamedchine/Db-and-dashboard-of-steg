const db = require("../config/db");

const addDefectiveEquipment = async ({ 
  turbine_id, 
  kks, 
  description, 
  comments, 
  reported_at, 
  fixed_at,
  central_id
}) => {
  const [result] = await db.execute(
    `INSERT INTO defective_equipment 
     (central_id, turbine_id, kks, description, comments, reported_at, fixed_at,status) 
     VALUES (?, ?, ?, ?, ?, ?, ?,?)`,
    [
      central_id,
      turbine_id,
      kks,
      description,
      comments,
      reported_at,
      fixed_at === undefined ? null : fixed_at , 
      fixed_at === undefined? "Active" : "Fixed" 
    ]
  );

  const insertedId = result.insertId;

  const [rows] = await db.execute(
    `SELECT * FROM defective_equipment WHERE id = ?`,
    [insertedId]
  );

  return rows[0]; // return the inserted defective equipment entry
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


const getunfixeddefectiveequipments = async (centralid, page = 1, limit = 10, turbine_id = null) => {
  const offset = (page - 1) * limit;

  let query = `
    SELECT * 
    FROM defective_equipment
    WHERE defective_equipment.fixed_at IS NULL
      AND defective_equipment.central_id = ?
  `;

  const params = [centralid];

  if (turbine_id) {
    query += ` AND defective_equipment.turbine_id = ? `;
    params.push(turbine_id);
  }

  query += ` ORDER BY defective_equipment.created_at DESC LIMIT ? OFFSET ? `;
  params.push(limit, offset);

  const [rows] = await db.execute(query, params);
  return rows;
};



const updateDefectiveEquipmentStatus = async (id, status, fixedat) => {
  await db.execute(
    "UPDATE defective_equipment SET status = ?, fixed_at = ? WHERE id = ?",  // Removed comma after ?
    [status, fixedat, id]
  );
};

const getfixeddefectiveequipments = async (centralid, page = 1, limit = 10, turbine_id = null) => {
  const offset = (page - 1) * limit;

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

  query += ` ORDER BY defective_equipment.created_at DESC LIMIT ? OFFSET ? `;
  params.push(limit, offset);

  const [rows] = await db.execute(query, params);
  return rows;
};


const getpendingdefectiveequipments = async (centralid, page = 1, limit = 10, turbine_id = null) => {
  const offset = (page - 1) * limit;

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

  query += ` ORDER BY defective_equipment.created_at DESC LIMIT ? OFFSET ? `;
  params.push(limit, offset);

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




const getDefectiveequipementbyperiodeandcentralid = async(centralid , startdate, enddate) => {
  
} 


module.exports = {
  getDefectiveequipementbyperiodeandcentralid,
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