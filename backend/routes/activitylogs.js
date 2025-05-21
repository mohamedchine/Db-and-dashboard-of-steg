const db = require('../config/db');

const addactivitylog = async (activityobject) => {
  try {
    const {
      central_user_email,
      action,
      target_table,
      description,
      target_table_old_value = null,
      target_table_new_value = null,
      consequence_table = null,
      consequence_table_old_value = null,
      consequence_table_new_value = null
    } = activityobject;
    
    // Convert objects to JSON strings if they exist
    const old_value = target_table_old_value ? JSON.stringify(target_table_old_value) : null;
    const new_value = target_table_new_value ? JSON.stringify(target_table_new_value) : null;
    
    // Only convert consequence values if consequence_table exists
    const consequence_old_value = consequence_table && consequence_table_old_value ? 
      JSON.stringify(consequence_table_old_value) : null;
    const consequence_new_value = consequence_table && consequence_table_new_value ? 
      JSON.stringify(consequence_table_new_value) : null;

    const query = `
      INSERT INTO activity_logs (
        central_user_email,
        action,
        target_table,
        description,
        target_table_old_value,
        target_table_new_value,
        consequence_table,
        consequence_table_old_value,
        consequence_table_new_value
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(query, [
      central_user_email,
      action,
      target_table,
      description,
      old_value,
      new_value,
      consequence_table,
      consequence_old_value,
      consequence_new_value
    ]);

    return result.insertId;
  } catch (error) {
    console.error('Error adding activity log:', error);
    throw error;
  }
};

module.exports = { addactivitylog };