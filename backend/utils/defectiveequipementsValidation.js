const joi = require("joi");

const validateDefectiveEquipment = (data) => {
  const schema = joi.object({
    turbine_id: joi.number().required(),
    kks: joi.string().required(),
    description: joi.string().required(),
    reported_at: joi.date().required(),
    fixed_at: joi.date().optional()
      .min(joi.ref('reported_at'))
      .messages({
        'date.min': 'Fixed date must be equal to or after reported date'
      })
  });
  return schema.validate(data);
};

module.exports = { validateDefectiveEquipment };