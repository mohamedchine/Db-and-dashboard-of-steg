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


module.exports = { addMaintenance,findMaintenanceById ,deleteMaintenance , getUndoneMaintenance,updateMaintenanceEndDate ,getDoneMaintenance};

