const {  validateperformance } = require('../../utils/perofrmanceValidation');
const {
  getperformancebyturbinedate,
  updateperformance,
  addperformance,
  getPerformancesByCentralAndDate
} = require('../../model/performance');
const {addactivitylog} = require('../../model/activitylogs');
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
      
      const { central_id, turbine_id, ...bodyWithoutIds } = req.body;
      const updatedPerformance = {
        id: existingPerformance.id,
        central_id: centralid,
        turbine_id: turbineid,
        ...bodyWithoutIds
      };

      const activity = {
        central_user_email: req.user.steg_email,
        action: "update",
        target_table: "performances",
        description: "updated a performance record",
        target_table_old_value: existingPerformance,
        target_table_new_value: updatedPerformance
      };
      
      await addactivitylog(activity);
      return res.status(200).json({
        message: "Performance updated successfully",
        performance: 
         updatedPerformance
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
      // Remove central_id and turbine_id from req.body to prevent override
      const { central_id, turbine_id, ...bodyWithoutIds } = req.body;
      const newPerformance = {
        id: newPerformanceId,
        central_id: centralid,
        turbine_id: turbineid,
        ...bodyWithoutIds
      };

      const activity = {
        central_user_email: req.user.steg_email,
        action: "add",
        target_table: "performances",
        description: "added a performance record",
        target_table_old_value: null,
        target_table_new_value: newPerformance
      };
      
      await addactivitylog(activity);
      return res.status(201).json({
        message: "Performance added successfully",
        performance: newPerformance
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};



const getPerformanceCtrl = async (req, res) => {
    const centralid = req.params.centralid;

    const date = req.body.date? req.body.date : new Date().toISOString().split('T')[0]; 
   
    const turbineid = req.params.turbineid;
    try {
      const performances = await getPerformancesByCentralAndDate(centralid, date , turbineid);
      return res.status(200).json({ date, performances });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  };
module.exports = {
  addPerformanceCtrl ,getPerformanceCtrl
};