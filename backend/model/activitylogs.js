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

    // Use JSON_UNQUOTE to convert JSON values to plain strings before comparing,
    // since central_id may be stored as a JSON number or JSON string depending on the source
    const whereClause = `
      (
        (action IN ('add', 'update') AND 
          JSON_UNQUOTE(JSON_EXTRACT(target_table_new_value, '$.central_id')) = ?
        ) 
        OR 
        (action = 'delete' AND 
          JSON_UNQUOTE(JSON_EXTRACT(target_table_old_value, '$.central_id')) = ?
        )
      )
    `;

    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total 
      FROM activity_logs 
      WHERE ${whereClause}
    `;
    const [countResult] = await db.execute(countQuery, [String(centralid), String(centralid)]);
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    // Get paginated data
    const dataQuery = `
      SELECT * FROM activity_logs 
      WHERE ${whereClause}
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?
    `;
    const [activities] = await db.execute(dataQuery, [String(centralid), String(centralid), String(limit), String(offset)]);
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