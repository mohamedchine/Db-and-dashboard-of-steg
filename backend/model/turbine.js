const db = require('../config/db');
const findturbinebyid = async (id) => {
  const [rows] = await db.execute('SELECT * FROM turbine WHERE turbine_id = ?', [id]);
  return rows[0];
};
module.exports = {findturbinebyid};