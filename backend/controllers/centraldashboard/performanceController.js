const { validateperformance } = require('../../utils/perofrmanceValidation');
const {
  getperformancebyturbinedate,
  updateperformance,
  addperformance,
  getPerformancesByCentralAndDate
} = require('../../model/performance');

const addPerformanceCtrl = async (req, res) => {
  const { error } = validateperformance(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const {
    performance_date,
    fuel_type,
    load_status,
    period,
    fuel_consumption,
    gross_energy_production,
    auxiliaries_consumption,
    net_active_energy_production,
    reactive_energy_production,
    startups,
    ignitions,
    couplings,
    load_trips,
    net_energy_distribution,
    starts_since_last_inspection,
    max_power_peak,
    flame_hours,
    production_hours,
    daily_availability,
    average_hourly_power,
    gas_calorific_value,
    gasoil_calorific_value,
    specific_consumption,
    daily_availability_rate,
    cumulative_availability_rate,
    operating_hours_last_inspection,
    starts_since_first_coupling,
    operating_hours_since_first_coupling,
    pumpable_gasoil_stock,
    autonomy_at_pmc,
    mwh_peak,
    mwh_tlr
  } = req.body;

  const turbineid = req.params.turbineid;
  const centralid = req.params.centralid;

  try {
    // Step 1: Check if record exists
    const existingPerformance = await getperformancebyturbinedate(centralid, turbineid, performance_date);

    if (existingPerformance && existingPerformance.id) {
      // Step 2: Update existing
      await updateperformance(
        existingPerformance.id,
        fuel_type,
        load_status,
        period,
        fuel_consumption,
        gross_energy_production,
        auxiliaries_consumption,
        net_active_energy_production,
        reactive_energy_production,
        startups,
        ignitions,
        couplings,
        load_trips,
        net_energy_distribution,
        starts_since_last_inspection,
        max_power_peak,
        flame_hours,
        production_hours,
        daily_availability,
        average_hourly_power,
        gas_calorific_value,
        gasoil_calorific_value,
        specific_consumption,
        daily_availability_rate,
        cumulative_availability_rate,
        operating_hours_last_inspection,
        starts_since_first_coupling,
        operating_hours_since_first_coupling,
        pumpable_gasoil_stock,
        autonomy_at_pmc,
        mwh_peak,
        mwh_tlr
      );

      return res.status(200).json({
        message: "Performance updated successfully",
        performance: {
          id: existingPerformance.id,
          ...req.body
        }
      });
    } else {
      // Step 3: Add new
      const newPerformanceId = await addperformance(
        centralid,
        turbineid,
        performance_date,
        fuel_type,
        load_status,
        period,
        fuel_consumption,
        gross_energy_production,
        auxiliaries_consumption,
        net_active_energy_production,
        reactive_energy_production,
        startups,
        ignitions,
        couplings,
        load_trips,
        net_energy_distribution,
        starts_since_last_inspection,
        max_power_peak,
        flame_hours,
        production_hours,
        daily_availability,
        average_hourly_power,
        gas_calorific_value,
        gasoil_calorific_value,
        specific_consumption,
        daily_availability_rate,
        cumulative_availability_rate,
        operating_hours_last_inspection,
        starts_since_first_coupling,
        operating_hours_since_first_coupling,
        pumpable_gasoil_stock,
        autonomy_at_pmc,
        mwh_peak,
        mwh_tlr
      );

      return res.status(201).json({
        message: "Performance added successfully",
        performance: {
          id: newPerformanceId,
          ...req.body
        }
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};



const getPerformanceCtrl = async (req, res) => {
    const centralid = req.params.centralid;
    const date = req.query.date || new Date().toISOString().split('T')[0]; 
  
    try {
      const performances = await getPerformancesByCentralAndDate(centralid, date);
      return res.status(200).json({ date, performances });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  };
module.exports = {
  addPerformanceCtrl ,getPerformanceCtrl
};