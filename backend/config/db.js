const sql = require('mysql2/promise');

const db =sql.createPool({
        host: process.env.db_host, 
        user: process.env.db_user,      
        password: process.env.db_password,      
        database: process.env.db_name
   
}) 
module.exports = db  ;

