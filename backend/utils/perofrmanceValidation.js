const Joi = require('joi');

const validateperformance = (obj) => {
  const performanceSchema = Joi.object({
    // Required fields
    performance_date: Joi.date().iso().required(),
    fuel_type: Joi.string().valid('Gas', 'Gas-oil').required(),
    load_status: Joi.string().valid('No Load', 'Loaded').required(),
    period: Joi.string().valid('Day', 'Peak', 'Night').required(),

    // Optional numeric fields with precision 2
    fuel_consumption: Joi.number().precision(2).positive().optional().allow(null),
    gross_energy_production: Joi.number().precision(2).min(0).optional().allow(null),
    auxiliaries_consumption: Joi.number().precision(2).min(0).optional().allow(null),
    net_active_energy_production: Joi.number().precision(2).min(0).optional().allow(null),
    reactive_energy_production: Joi.number().precision(2).min(0).optional().allow(null),

    // Counters (non-negative integers)
    startups: Joi.number().integer().min(0).default(0),
    ignitions: Joi.number().integer().min(0).default(0),
    couplings: Joi.number().integer().min(0).default(0),
    load_trips: Joi.number().integer().min(0).default(0),

    // More optional decimal fields
    net_energy_distribution: Joi.number().precision(2).min(0).optional().allow(null),
    starts_since_last_inspection: Joi.number().integer().min(0).optional().allow(null),
    max_power_peak: Joi.number().precision(2).min(0).optional().allow(null),
    flame_hours: Joi.number().precision(2).min(0).optional().allow(null),
    production_hours: Joi.number().precision(2).min(0).optional().allow(null),
    daily_availability: Joi.number().precision(2).min(0).max(100).optional().allow(null),
    average_hourly_power: Joi.number().precision(2).min(0).optional().allow(null),
    gas_calorific_value: Joi.number().precision(2).positive().optional().allow(null),
    gasoil_calorific_value: Joi.number().precision(2).positive().optional().allow(null),
    specific_consumption: Joi.number().precision(2).positive().optional().allow(null),
    daily_availability_rate: Joi.number().precision(2).min(0).max(100).optional().allow(null),
    cumulative_availability_rate: Joi.number().precision(2).min(0).max(100).optional().allow(null),
    operating_hours_last_inspection: Joi.number().integer().min(0).optional().allow(null),
    starts_since_first_coupling: Joi.number().integer().min(0).optional().allow(null),
    operating_hours_since_first_coupling: Joi.number().integer().min(0).optional().allow(null),
    pumpable_gasoil_stock: Joi.number().precision(2).min(0).optional().allow(null),
    autonomy_at_pmc: Joi.number().precision(2).min(0).optional().allow(null),
    mwh_peak: Joi.number().precision(2).min(0).optional().allow(null),
    mwh_tlr: Joi.number().precision(2).min(0).optional().allow(null),
  });
  
  return performanceSchema.validate(obj);
};



const validateperformancefortherequest = (obj) => {
  const performanceSchema = Joi.object({
    // Required fields
    performance_date: Joi.date().iso().required(),
    fuel_type: Joi.string().valid('Gas', 'Gas-oil').required(),
    load_status: Joi.string().valid('No Load', 'Loaded').required(),
    period: Joi.string().valid('Day', 'Peak', 'Night').required(),

    // Optional numeric fields with precision 2
    central_id :Joi.number().optional(),
    turbine_id :Joi.number().optional(),
    fuel_consumption: Joi.number().precision(2).positive().optional().allow(null),
    gross_energy_production: Joi.number().precision(2).min(0).optional().allow(null),
    auxiliaries_consumption: Joi.number().precision(2).min(0).optional().allow(null),
    net_active_energy_production: Joi.number().precision(2).min(0).optional().allow(null),
    reactive_energy_production: Joi.number().precision(2).min(0).optional().allow(null),

    // Counters (non-negative integers)
    startups: Joi.number().integer().min(0).default(0),
    ignitions: Joi.number().integer().min(0).default(0),
    couplings: Joi.number().integer().min(0).default(0),
    load_trips: Joi.number().integer().min(0).default(0),

    // More optional decimal fields
    net_energy_distribution: Joi.number().precision(2).min(0).optional().allow(null),
    starts_since_last_inspection: Joi.number().integer().min(0).optional().allow(null),
    max_power_peak: Joi.number().precision(2).min(0).optional().allow(null),
    flame_hours: Joi.number().precision(2).min(0).optional().allow(null),
    production_hours: Joi.number().precision(2).min(0).optional().allow(null),
    daily_availability: Joi.number().precision(2).min(0).max(100).optional().allow(null),
    average_hourly_power: Joi.number().precision(2).min(0).optional().allow(null),
    gas_calorific_value: Joi.number().precision(2).positive().optional().allow(null),
    gasoil_calorific_value: Joi.number().precision(2).positive().optional().allow(null),
    specific_consumption: Joi.number().precision(2).positive().optional().allow(null),
    daily_availability_rate: Joi.number().precision(2).min(0).max(100).optional().allow(null),
    cumulative_availability_rate: Joi.number().precision(2).min(0).max(100).optional().allow(null),
    operating_hours_last_inspection: Joi.number().integer().min(0).optional().allow(null),
    starts_since_first_coupling: Joi.number().integer().min(0).optional().allow(null),
    operating_hours_since_first_coupling: Joi.number().integer().min(0).optional().allow(null),
    pumpable_gasoil_stock: Joi.number().precision(2).min(0).optional().allow(null),
    autonomy_at_pmc: Joi.number().precision(2).min(0).optional().allow(null),
    mwh_peak: Joi.number().precision(2).min(0).optional().allow(null),
    mwh_tlr: Joi.number().precision(2).min(0).optional().allow(null),
  });
  
  return performanceSchema.validate(obj);
};
module.exports = { validateperformance ,validateperformancefortherequest};