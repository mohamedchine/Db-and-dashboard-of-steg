const db = require("../config/db");

const findreportbyid = async (id) => {
    const [rows] = await db.execute("select * from report where id = ?", [id]);
    if (rows.length == 0) return -1;
    return rows[0]; 
}

module.exports = {
    findreportbyid
}
