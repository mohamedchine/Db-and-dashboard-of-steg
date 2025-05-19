const db = require('../config/db');

const findUserByEmail = async (email) => {
    const unitsTypes = ['direction', 'central', 'groupement'];
    let user = null;
    let unittype = '';
    let unitname = ''; 

    for (const type of unitsTypes) {
        const [result] = await db.execute(`SELECT * FROM ${type}_accounts WHERE steg_email = ?`, [email]);
        if (result.length > 0) {
            user = result[0];
            unittype = type;
            const unitIdField = `${type}_id`;
            const unitTable = type;

            const [[{ name }]] = await db.execute(
                `SELECT name FROM ${unitTable} WHERE ${unitIdField} = ?`,
                [user[unitIdField]]
            );

            unitname = name;
            break;
        }
    }

    return { user, unittype, unitname };
};


const findUserById = async (id) => {
    const unitsTypes = ['direction', 'central', 'groupement'];
    let user = null;
    let unittype = '';
    let unitname = '';

    for (const type of unitsTypes) {
        const [result] = await db.execute(`SELECT * FROM ${type}_accounts WHERE id = ?`, [id]);
        if (result.length > 0) {
            user = result[0];
            unittype = type;
            const unitIdField = `${type}_id`;
            const unitTable = type;

            const [[{ name }]] = await db.execute(
                `SELECT name FROM ${unitTable} WHERE ${unitIdField} = ?`,
                [user[unitIdField]]
            );

            unitname = name;
            break;
        }
    }

    return { user, unittype, unitname };
};
const findUserByIdAndUnittype = async (id, unittype) => {
    const validTypes = ['direction', 'central', 'groupement'];
    if (!validTypes.includes(unittype)) {
        throw new Error(`Invalid unit type: ${unittype}`);
    }

    const [result] = await db.execute(
        `SELECT * FROM ${unittype}_accounts WHERE id = ?`,
        [id]
    );

    if (result.length === 0) {
        return { user: null, unitname: '', unittype };
    }

    const user = result[0];
    const unitIdField = `${unittype}_id`;

    const [[{ name }]] = await db.execute(
        `SELECT name FROM ${unittype} WHERE ${unitIdField} = ?`,
        [user[unitIdField]]
    );

    return { user, unittype, unitname: name };
};


//i made it by mistake in this folder i wont change it 
module.exports = { findUserByEmail,findUserById ,findUserByIdAndUnittype};
