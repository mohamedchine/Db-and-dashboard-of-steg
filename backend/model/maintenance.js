const db = require("../config/db");

const addMaintenance = async ({ body, params }) => {
    const [result] = await db.execute(
      `INSERT INTO maintenance 
       (report_id, kks, ot_number, description, type, 
        related_item_type, related_item_id, start, end) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        params.reportid,  
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


const getUndoneMaintenance = async (centralId) => {
  const [rows] = await db.execute(
    `SELECT m.* 
     FROM maintenance m, central c, report r 
     WHERE m.report_id = r.id 
     AND r.central_id = c.central_id
     AND c.central_id = ?
     AND m.end IS NULL
     ORDER BY m.start ASC`,
    [centralId]
  );
  return rows.length === 0 ? -1 : rows;
};



const updateMaintenanceDate = async (id, end) => {
  await db.execute(
    "UPDATE maintenance SET start = ?, end = ? WHERE id = ?",
    [ end, id]
  );

  const [rows] = await db.execute(
    "SELECT * FROM maintenance WHERE id = ?",
    [id]
  );

  return rows[0];
};


const updateMaintenanceEndDate = async (id, endDate) => {
  await db.execute(
    "UPDATE maintenance SET end = ? WHERE id = ?",
    [endDate || null, id]
  );
   const updatedmaintenance =   findMaintenanceById(id);
   return updatedmaintenance;
};

const getTodayMaintenance = async (centralId) => {
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  
  const [rows] = await db.execute(
    `SELECT m.* 
     FROM maintenance m
     WHERE m.report_id IN (
       SELECT id FROM report WHERE central_id = ?
     )
     AND DATE(m.created_at) = ?
     ORDER BY m.created_at DESC`,
    [centralId, today]
  );
  
  return rows.length === 0 ? -1 : rows;
};
module.exports = { addMaintenance,findMaintenanceById ,deleteMaintenance , getUndoneMaintenance,updateMaintenanceEndDate , getTodayMaintenance};

