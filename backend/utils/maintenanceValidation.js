const Joi = require('joi'); 
const {getAllUnresolvedAlarms} = require('../model/alarms');
const {getallunfixeddefectiveequipments} = require('../model/defectiveequipement');



const validateMaintenance = (obj) => {
 
  const maintenanceSchema = Joi.object({
   
    kks: Joi.string().max(255).required(),
    ot_number: Joi.string().max(255).required(),
    description: Joi.string().required(),
    type: Joi.string().valid('Curative', 'Systematic').required(),
    related_item_type: Joi.string().valid('Alarm', 'Defective Equipment').required(),
    related_item_id: Joi.number().integer().positive().required(),
    start: Joi.date().iso().optional(),
    end: Joi.date().iso().min(Joi.ref('start')).optional(),
  
  });

  // Validate the input object
  return maintenanceSchema.validate(obj);
};






//when the maintance is systematic donc its for an alarm (wi9a2i) and when curative its for defective equipement (3ilaji) w ylzmna nthabtou hatta fel alarm chwy
const validatesomemaintancecstuff = async(req, type, related_item_type, related_item_id, centralid) => {
    // First validate basic date formats and logic
    if (req.body.start) {
        const startDate = new Date(req.body.start);
        if (isNaN(startDate.getTime())) {
            return { 
                valid: false, 
                message: "Invalid start date format",
                details: {
                    provided: req.body.start,
                    expected_format: "ISO 8601 (YYYY-MM-DDTHH:MM:SSZ)"
                }
            };
        }

        // Validate end date if provided
        if (req.body.end) {
            const endDate = new Date(req.body.end);
            if (isNaN(endDate.getTime())) {
                return { 
                    valid: false, 
                    message: "Invalid end date format",
                    details: {
                        provided: req.body.end,
                        expected_format: "ISO 8601 (YYYY-MM-DDTHH:MM:SSZ)"
                    }
                };
            }

            if (endDate <= startDate) {
                return { 
                    valid: false, 
                    message: "Maintenance end date must be after start date",
                    details: {
                        start_date: req.body.start,
                        end_date: req.body.end
                    }
                };
            }
        }
    }

    // Validate systematic maintenance with alarm
    if (type === "Systematic" && related_item_type === "Alarm") {
        const alarms = await getAllUnresolvedAlarms(centralid);
        let alarmFound = null;
        
        for (const alarm of alarms) {
            if (alarm.id == related_item_id) {
                alarmFound = alarm;
                req.alarmid = alarm.id;
                break;
            }
        }

        if (!alarmFound) {
            return { valid: false, message: "Invalid alarm ID or alarm not in your central" };
        }


        // Date validation against alarm
        const maintenanceStart = new Date(req.body.start);
        const alarmDate = new Date(alarmFound.happened_at);
        
        if (maintenanceStart <= alarmDate) {
            return { 
                valid: false, 
                message: "Maintenance cannot start before alarm occurrence",
                details: {
                    alarm_occurrence: alarmFound.happened_at,
                    maintenance_start: req.body.start
                }
            };
        }

        return { valid: true, message: "success" };
    }

    // Validate curative maintenance with equipment
    if (type === "Curative" && related_item_type === "Defective Equipment") {
        const defectiveEquipment = await getallunfixeddefectiveequipments(centralid);
        let equipmentFound = null;

        for (const equipment of defectiveEquipment) {
            if (equipment.id == related_item_id) {
                equipmentFound = equipment;
                req.defecteqid = equipment.id;
                break;
            }
        }

        if (!equipmentFound) {
            return { valid: false, message: "Invalid equipment ID or equipment not in your central" };
        }

        // Date validation against equipment report
        const maintenanceStart = new Date(req.body.start);
        const reportDate = new Date(equipmentFound.reported_at);
        
        if (maintenanceStart <= reportDate) {
            return { 
                valid: false, 
                message: "Maintenance cannot start before equipment was reported",
                details: {
                    equipment_reported: equipmentFound.reported_at,
                    maintenance_start: req.body.start
                }
            };
        }

        return { valid: true, message: "success" };
    }

    return { valid: false, message: "Invalid maintenance type and related item combination" };
};
module.exports={validatesomemaintancecstuff ,validateMaintenance }