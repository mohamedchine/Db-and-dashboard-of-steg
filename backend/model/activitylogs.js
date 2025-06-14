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





const getallactivitylogsforcentral = async (centralid, page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;

    // Common WHERE clause used in both queries
    const whereClause = `
      (
        (action IN ('add', 'update') AND (
          JSON_EXTRACT(target_table_new_value, '$.central_id') = ? OR 
          JSON_EXTRACT(target_table_new_value, '$.central_id') = CAST(? AS CHAR)
        )) 
        OR 
        (action = 'delete' AND (
          JSON_EXTRACT(target_table_old_value, '$.central_id') = ? OR 
          JSON_EXTRACT(target_table_old_value, '$.central_id') = CAST(? AS CHAR)
        ))
      )
    `;

    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total 
      FROM activity_logs 
      WHERE ${whereClause}
    `;
    const [countResult] = await db.execute(countQuery, [centralid, centralid, centralid, centralid]);
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    // Get paginated data
    const dataQuery = `
      SELECT * FROM activity_logs 
      WHERE ${whereClause}
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?
    `;
    const [activities] = await db.execute(dataQuery, [centralid, centralid, centralid, centralid, limit, offset]);

    const parsedActivities = activities.map(activity => ({
      ...activity,
      target_table_old_value: activity.target_table_old_value ? JSON.parse(activity.target_table_old_value) : null,
      target_table_new_value: activity.target_table_new_value ? JSON.parse(activity.target_table_new_value) : null,
      consequence_table_old_value: activity.consequence_table_old_value ? JSON.parse(activity.consequence_table_old_value) : null,
      consequence_table_new_value: activity.consequence_table_new_value ? JSON.parse(activity.consequence_table_new_value) : null
    }));

    return {
      activities: parsedActivities,
      totalPages,
      total
    };
  } catch (error) {
    throw error;
  }
};

module.exports = { addactivitylog ,getallactivitylogsforcentral};