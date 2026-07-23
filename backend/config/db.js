const sql = require('mysql2/promise');
const db = sql.createPool(process.env.DATABASE_URL);
module.exports = db;
