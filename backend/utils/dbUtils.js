const db = require('../config/db');

const findUserByEmail = async (email) => {
    const userTypes = ['direction', 'central', 'groupement'];
    let user = null;
    let role = '';

    for (const type of userTypes) {
        const [result] = await db.execute(`SELECT * FROM ${type}_accounts WHERE steg_email = ?`, [email]);
        if (result.length > 0) {
            user = result[0];
            role = `${type}_employee`;
            break;
        }
    }

    return { user, role };
};

module.exports = { findUserByEmail };
