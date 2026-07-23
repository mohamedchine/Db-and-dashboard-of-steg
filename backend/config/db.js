const sql = require('mysql2/promise');

const db = sql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        connectTimeout: 10000 // 10 seconds to establish a connection
    });

// Surface pool-level errors (e.g. connection lost, fatal errors) instead of
// letting them crash the process silently.
db.on('error', (err) => {
    console.error('Unexpected error on idle MySQL connection:', err.message);
    console.error(err.stack);
});

module.exports = db  ;
