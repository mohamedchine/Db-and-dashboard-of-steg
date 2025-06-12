
const joi = require("joi");

const validateAddAlarm = (data) => {
  const schema = joi.object({
    turbine_id: joi.number().required(),
    alarm_code: joi.string().required().min(2).max(10),
    description: joi.string().required(),
    time :joi.optional(),
    
    happened_at: joi.optional(),
    resolved_at: joi.optional()
  });
  return schema.validate(data);
};

module.exports = { validateAddAlarm };