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
const findturbinebyid = async (centralid , turbineid) => {
   const [rows] = await db.execute("select * from turbine where turbine_id =? and central_id =?", [turbineid , centralid]);
    if(rows.length == 0) return -1;
    return rows[0];
}



const getCentralsByGroupementId = async (groupementid) => {
    try {
        const [rows] = await db.execute(
            'SELECT central_id FROM central WHERE groupement_id = ?', 
            [groupementid]
        );
        const centralIds = rows.map(row => row.central_id);
        return centralIds;
    } catch (error) {
        console.error('Error fetching central IDs:', error);
        throw error;
    }
};


const getTurbinesByCentralId = async (centralId) => {
    try {
      const [rows] = await db.execute(
        'SELECT turbine_id, name FROM turbine WHERE central_id = ?',
        [centralId]
      );
      return rows;
    } catch (error) {
      console.error('Error fetching turbines:', error);
      throw error;
    }
  };
  
  // Get central name by ID
  const getCentralNameById = async (centralId) => {
    try {
      const [rows] = await db.execute(
        'SELECT name FROM central WHERE central_id = ?',
        [centralId]
      );
      return rows.length > 0 ? rows[0].name : 'Unknown';
    } catch (error) {
      console.error('Error fetching central name:', error);
      throw error;
    }
  };
  const getallcentralids = async () => {
    try {
        const [rows] = await db.execute("SELECT central_id FROM central");
        const centralIds = rows.map(row => row.central_id);
        return centralIds;
    } catch (error) {
        console.error('Error fetching all central IDs:', error);
        throw error;
    }
};

module.exports = {getcentralidbyreportid,findcentralbyid,findturbinebyid,getCentralsByGroupementId ,getCentralNameById ,getTurbinesByCentralId,getallcentralids};