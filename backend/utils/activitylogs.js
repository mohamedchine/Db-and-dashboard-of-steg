const {addactivity} = require('../model/activity_log');

const record_activity = async(req, action, targettable, changes, description) => {
    const record = [
        req.user.unittype === "central" ? req.user.id : null,
        req.user.unittype === "groupement" ? req.user.id : null,
        action,
        targettable,
        req.params.centralid,
        JSON.stringify(changes), 
        description
    ];
    
    await addactivity(record);
}

module.exports = {
    record_activity
}