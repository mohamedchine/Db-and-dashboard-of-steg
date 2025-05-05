const db = require('../config/db');

const addactivity = async(row) => {
    await db.execute(
        "INSERT INTO activity_logs (centraluser_id, groupementuser_id, action, target_table, daily_report_id, changes, description) VALUES (?, ?, ?, ?, ?, ?, ?)",
        row
    );
}

module.exports = {
    addactivity
}