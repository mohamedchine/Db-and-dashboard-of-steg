const db = require('../config/db');

/**
 * Add a new modification request to the database
 * @param {Object} data - The modification request data
 * @param {string} data.method - Type of modification (update/delete)
 * @param {string} data.table_name - Name of the table being modified
 * @param {number} data.record_id - ID of the record being modified
 * @param {Object|null} data.old_value - Original value of the field (as JSON object)
 * @param {Object|null} data.new_value - Requested new value (as JSON object)
 * @param {string|null} data.raison - Reason for the modification request
 * @param {number} data.requester_id - ID of the user making the request
 * @param {number} data.requester_central_id - Central ID of the requester
 * @param {number|null} data.receiver_groupement_id - Groupement ID of the receiver (optional)
 * @returns {Promise<Object>} The result of the database operation
 */
const addModificationRequest = async (data) => {
    const {
        method,
        table_name,
        record_id,
        old_value,
        new_value,
        raison,
        requester,
        receiver_groupement_id
    } = data;

    // Convert JavaScript objects to JSON strings if they exist
    const oldValueJson = old_value ? JSON.stringify(old_value) : null;
    const newValueJson = new_value ? JSON.stringify(new_value) : null;
    const requesterJson = requester ? JSON.stringify(requester) : null;
    
    const query = `
        INSERT INTO request_modification 
        (method, table_name, record_id, old_value, new_value, raison, requester, receiver_groupement_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    try {
        const [result] = await db.execute(query, [
            method,
            table_name,
            record_id,
            oldValueJson,
            newValueJson,
            raison,
            requesterJson, 
            receiver_groupement_id
        ]);
        
        return {
            success: true,
            id: result.insertId,
            message: "Modification request created successfully"
        };
    } catch (error) {
        console.error("Error adding modification request:", error);
        throw {
            success: false,
            message: "Failed to create modification request",
            error: error.message
        };
    }
};

/**
 * Get all modification requests
 * @returns {Promise<Array>} Array of modification requests with parsed JSON values
 */
const getAllModificationRequests = async () => {
    const query = `SELECT * FROM request_modification ORDER BY created_at DESC`;
    
    try {
        const [rows] = await db.execute(query);
        
        // Parse JSON values from database
        return rows.map(row => parseJsonFields(row));
    } catch (error) {
        console.error("Error fetching modification requests:", error);
        throw {
            success: false,
            message: "Failed to fetch modification requests",
            error: error.message
        };
    }
};

/**
 * Get modification requests by requester ID
 * @param {number} requesterId - ID of the user who made the requests
 * @returns {Promise<Array>} Array of modification requests with parsed JSON values
 */
const getModificationRequestsByUser = async (requesterId) => {
    const query = `SELECT * FROM request_modification WHERE requester_id = ? ORDER BY created_at DESC`;
    
    try {
        const [rows] = await db.execute(query, [requesterId]);
        
        // Parse JSON values from database
        return rows.map(row => parseJsonFields(row));
    } catch (error) {
        console.error("Error fetching user modification requests:", error);
        throw {
            success: false,
            message: "Failed to fetch user modification requests",
            error: error.message
        };
    }
};

/**
 * Get modification requests by groupement ID
 * @param {number} groupementId - ID of the groupement
 * @returns {Promise<Array>} Array of modification requests with parsed JSON values
 */
const getModificationRequestsByGroupement = async (groupementId) => {
    const query = `SELECT * FROM request_modification WHERE receiver_groupement_id = ? ORDER BY created_at DESC`;
    
    try {
        const [rows] = await db.execute(query, [groupementId]);
        
        // Parse JSON values from database
        return rows.map(row => parseJsonFields(row));
    } catch (error) {
        console.error("Error fetching groupement modification requests:", error);
        throw {
            success: false,
            message: "Failed to fetch groupement modification requests",
            error: error.message
        };
    }
};

/**
 * Get a specific modification request by ID
 * @param {number} id - ID of the modification request
 * @returns {Promise<Object|null>} The modification request with parsed JSON values or null if not found
 */
const getModificationRequestById = async (id) => {
    const query = `SELECT * FROM request_modification WHERE id = ?`;
    
    try {
        const [rows] = await db.execute(query, [id]);
        
        if (rows.length === 0) {
            return null;
        }
        
        // Parse JSON values from database
        return parseJsonFields(rows[0]);
    } catch (error) {
        console.error("Error fetching modification request:", error);
        throw {
            success: false,
            message: "Failed to fetch modification request",
            error: error.message
        };
    }
};

/**
 * Delete a modification request
 * @param {number} id - ID of the modification request to delete
 * @returns {Promise<Object>} Result of the operation
 */
const deleteModificationRequest = async (id) => {
    const query = `DELETE FROM request_modification WHERE id = ?`;
    
    try {
        const [result] = await db.execute(query, [id]);
        
        if (result.affectedRows === 0) {
            return {
                success: false,
                message: "Modification request not found"
            };
        }
        
        return {
            success: true,
            message: "Modification request deleted successfully"
        };
    } catch (error) {
        console.error("Error deleting modification request:", error);
        throw {
            success: false,
            message: "Failed to delete modification request",
            error: error.message
        };
    }
};

/**
 * Helper function to parse JSON fields in a row
 * @param {Object} row - Database row with potential JSON fields
 * @returns {Object} Row with parsed JSON fields
 */
const parseJsonFields = (row) => {
    // Create a copy of the row to avoid modifying the original
    const parsedRow = {...row};
    
    // Parse JSON fields if they exist
    if (parsedRow.old_value !== null && typeof parsedRow.old_value === 'string') {
        try {
            parsedRow.old_value = JSON.parse(parsedRow.old_value);
        } catch (error) {
            console.warn("Failed to parse old_value JSON:", error);
        }
    }
    
    if (parsedRow.new_value !== null && typeof parsedRow.new_value === 'string') {
        try {
            parsedRow.new_value = JSON.parse(parsedRow.new_value);
        } catch (error) {
            console.warn("Failed to parse new_value JSON:", error);
        }
    }
    
    // Add this block to parse requester
    if (parsedRow.requester !== null && typeof parsedRow.requester === 'string') {
        try {
            parsedRow.requester = JSON.parse(parsedRow.requester);
        } catch (error) {
            console.warn("Failed to parse requester JSON:", error);
        }
    }
    
    return parsedRow;
};
const getModificationRequestsByRecordId = async (recordId) => {
    const query = `SELECT * FROM request_modification WHERE record_id = ? ORDER BY created_at DESC`;
    
    const [rows] = await db.execute(query, [recordId]);

    if (rows.length === 0) {
        return null;
    }

    return rows.map(row => parseJsonFields(row));
};
const getModificationRequestByPerformanceDateAndCentralId = async (centralid, turbineid, performance_date) => {
    try {
        const query = `
            SELECT * FROM request_modification 
            WHERE table_name = 'performance' 
            AND JSON_EXTRACT(new_value, '$.centralid') = ?
            AND JSON_EXTRACT(new_value, '$.turbineid') = ?
            AND JSON_EXTRACT(new_value, '$.performance_date') = ?
            ORDER BY created_at DESC
        `;
        
        const [rows] = await db.execute(query, [centralid, turbineid, performance_date]);
        
        if (rows.length === 0) {
            return null;
        }

        return rows.map(row => parseJsonFields(row));
    } catch (error) {
        console.error("Error fetching modification requests:", error);
        throw error;
    }
};

module.exports = {getModificationRequestsByRecordId , getModificationRequestByPerformanceDateAndCentralId,
    addModificationRequest,
    getAllModificationRequests,
    getModificationRequestsByUser,
    getModificationRequestsByGroupement,
    getModificationRequestById,
    deleteModificationRequest
};