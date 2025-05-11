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
  const [result] = await db.execute(
    `INSERT INTO defective_equipment 
     (report_id, turbine_id, kks, description, comments, reported_at, fixed_at,status) 
     VALUES (?, ?, ?, ?, ?, ?, ?,?)`,
    [
      reportid,
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


const getunfixeddefectiveequipments = async (centralid) => {
  const [rows] = await db.execute(
    `SELECT defective_equipment.* 
     FROM defective_equipment, report 
     WHERE defective_equipment.fixed_at IS NULL 
       AND defective_equipment.report_id = report.id 
       AND report.central_id = ?`,
    [centralid]
  );

  return rows;
};
const updateDefectiveEquipmentStatus = async (id, status, fixedat) => {
  await db.execute(
    "UPDATE defective_equipment SET status = ?, fixed_at = ? WHERE id = ?",  // Removed comma after ?
    [status, fixedat, id]
  );
};



const todaysdefectiveequipments = async (centralid) => {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  const [rows] = await db.execute(
    `SELECT de.* 
     FROM defective_equipment de
     WHERE de.report_id IN (
         SELECT id FROM report WHERE central_id = ?
     )
     AND DATE(de.created_at) = ?
     ORDER BY de.created_at DESC`,
    [centralid, today]
  );

  return rows.length === 0 ? -1 : rows;
};


  const getDefectiveEquipmentByReportId = async (report_id) => {
    const [rows] = await db.execute(
      `SELECT * FROM defective_equipment 
       WHERE report_id = ? 
       ORDER BY created_at ASC`, 
      [report_id]
    );
    return rows; // always returns array (empty if no results)
  };




module.exports = { 
  getunfixeddefectiveequipments , 
  addDefectiveEquipment,
  findDefectiveEquipmentById,
  deleteDefectiveEquipment,
  getDefectiveEquipmentByTurbine,
  updateDefectiveEquipmentStatus , todaysdefectiveequipments,getDefectiveEquipmentByReportId
};