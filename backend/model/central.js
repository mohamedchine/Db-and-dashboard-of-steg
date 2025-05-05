const db = require("../config/db");


const findcentralbyid = async (id) => {
    const [rows] = await db.execute("select * from central where central_id = ?", [id]);
    if (rows.length == 0) return -1;
    return rows[0]; 
}

const getcentralidbyreportid = async (reportid) => {
    //  choufli central_id mel report id
    const [rows] = await db.execute("SELECT central_id FROM report WHERE id = ?", [reportid]);
    
    if (rows.length === 0) {
        return -1;
    }
    
    return rows[0].central_id;
}

module.exports = {getcentralidbyreportid,findcentralbyid};