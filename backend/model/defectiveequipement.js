const db = require("../config/db");

const addDefectiveEquipment = async ({ 
  
  turbine_id, 
  kks, 
  description, 
  comments, 
  reported_at, 
  fixed_at,
  reportid
}) => {
    
  await db.execute(
    `INSERT INTO defective_equipment 
     (report_id, turbine_id, kks, description, comments, reported_at, fixed_at ) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      reportid,
      turbine_id,
      kks ,
      description ,
      comments ,
      reported_at , 
      fixed_at === undefined ? null : fixed_at
    ]
  );
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

module.exports = { 
  addDefectiveEquipment,
  findDefectiveEquipmentById,
  deleteDefectiveEquipment,
  getDefectiveEquipmentByTurbine
};