const db = require('../config/db');

const findUserByEmail = async (email) => {
    const unitsTypes = ['direction', 'central', 'groupement'];
    let user = null;
    let unittype = '';

    for (const type of unitsTypes) {
        const [result] = await db.execute(`SELECT * FROM ${type}_accounts WHERE steg_email = ?`, [email]);
        if (result.length > 0) {
            user = result[0];
            unittype = type;
            break;
        }
    }

    return { user, unittype };
};

module.exports = { findUserByEmail };
