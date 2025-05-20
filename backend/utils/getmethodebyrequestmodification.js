const { getperformancebyturbinedate } = require("../model/performance");

const whatsmethode = async (obj) => {
    if (obj.table_name == "defectiveequipement" || obj.table_name == "alarms" || obj.table_name == "maintenance") {
        return "delete";
    }
    else if (obj.table_name == "performance") {
        //either update or insert
        let { central_id, turbine_id, performance_date } = obj.new_value;
        const existingPerformance = await getperformancebyturbinedate(central_id, turbine_id, performance_date);
        if (existingPerformance.id) {
            return "update";
        }
        else {
            return "insert";
        }
    }
}
module.exports = { whatsmethode };