const db= require('../config/db');

// Get by central, turbine and date
const getperformancebyturbinedate = async (centralid, turbineid, date) => {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM performance WHERE central_id = ? AND turbine_id = ? AND DATE(performance_date) = DATE(?)',
      [centralid, turbineid, date]
    );

    if (rows.length > 0) {
      return rows[0]; 
    }

    return -1; 
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updateperformance = async (
  id,
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
) => {
  try {
    await db.execute(
      `UPDATE performance SET 
        fuel_type = ?, 
        load_status = ?, 
        period = ?, 
        fuel_consumption = ?, 
        gross_energy_production = ?, 
        auxiliaries_consumption = ?, 
        net_active_energy_production = ?, 
        reactive_energy_production = ?, 
        startups = ?, 
        ignitions = ?,
        couplings = ?,
        load_trips = ?,
        net_energy_distribution = ?,
        starts_since_last_inspection = ?,
        max_power_peak = ?,
        flame_hours = ?,
        production_hours = ?,
        daily_availability = ?,
        average_hourly_power = ?,
        gas_calorific_value = ?,
        gasoil_calorific_value = ?,
        specific_consumption = ?,
        daily_availability_rate = ?,
        cumulative_availability_rate = ?,
        operating_hours_last_inspection = ?,
        starts_since_first_coupling = ?,
        operating_hours_since_first_coupling = ?,
        pumpable_gasoil_stock = ?,
        autonomy_at_pmc = ?,
        mwh_peak = ?,
        mwh_tlr = ?
      WHERE id = ?`,
      [
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
        mwh_tlr,
        id
      ]
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const addperformance = async (
  centralid,
  turbineid,
  date,
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
) => {
  try {
    const [result] = await db.execute(
      `INSERT INTO performance (
        central_id,
        turbine_id,
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
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        centralid,
        turbineid,
        date,
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
      ]
    );

    return result.insertId;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
const getPerformancesByCentralAndDate = async (centralid, date,turbineid) => {
    try {
      const [rows] = await db.execute(
        `SELECT * FROM performance 
         WHERE central_id = ? 
         AND DATE(performance_date) = DATE(?) And  turbine_id = ?`,
        [centralid, date , turbineid]
      );
  
      return rows.length > 0 ? rows : null;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };



  const getproductionbyturbineid = async (turbineid, periode) => {
    try {
        const [rows] = await db.execute(
            `SELECT 
                SUM(gross_energy_production) AS gross_production,
                SUM(auxiliaries_consumption) AS auxiliaries_consumption,
                SUM(net_active_energy_production) AS net_production
             FROM performance
             WHERE turbine_id = ? AND performance_date BETWEEN ? AND ?`,
            [turbineid, periode.start, periode.end]
        );
        return rows[0];
    } catch (error) {
        console.error('Error fetching production data:', error);
        throw error;
    }
};

const getavailabilitybyturbineid = async (turbineid, periode) => {
  const TOTAL_HOURS_PER_DAY = 24;

        try {
            // Alternative approach if you have multiple records per day
      const [rows] = await db.execute(
        `SELECT 
            SUM(production_hours) AS operating_hours,
            DATEDIFF(?, ?) + 1 AS days,
            SUM(daily_availability) AS available_hours
         FROM performance
         WHERE turbine_id = ? AND performance_date BETWEEN ? AND ?`,
        [periode.end, periode.start, turbineid, periode.start, periode.end]
      );
      
                  const { operating_hours, days, available_hours } = rows[0];
                  const total_hours = days * 24;
                  const availability_rate = total_hours ? (available_hours / total_hours) * 100 : null;
       
      return {
          available_hours,
          operating_hours,
          availability_rate: availability_rate?.toFixed(2),
      };
  } catch (error) {
      console.error('Error fetching availability data:', error);
      throw error;
  }
};

const getconsumptionbyturbineid = async (turbineid, periode) => {
  try {
      const [rows] = await db.execute(
          `SELECT 
              SUM(fuel_consumption) AS fuel_consumption,
              SUM(net_active_energy_production) AS net_production
           FROM performance
           WHERE turbine_id = ? AND performance_date BETWEEN ? AND ?`,
          [turbineid, periode.start, periode.end]
      );

      const { fuel_consumption, net_production } = rows[0];
      const specific_consumption = net_production ? (fuel_consumption / net_production) : null;

      return {
          fuel_consumption,
          specific_consumption: specific_consumption?.toFixed(4),
      };
  } catch (error) {
      console.error('Error fetching consumption data:', error);
      throw error;
  }
};

const getperformancebyid = async(id) => {
  try {
      const [performance] = await db.execute(
          `SELECT * FROM performance WHERE id = ?`,
          [id]
      );
      return performance[0] || null;
  } catch (error) {
      console.error('Error fetching performance by ID:', error);
      throw error; // Re-throw or handle as appropriate for your application
  }
};
module.exports = {
  getperformancebyid,
  getperformancebyturbinedate,
  updateperformance,
  addperformance,getPerformancesByCentralAndDate,getconsumptionbyturbineid,getavailabilitybyturbineid , getproductionbyturbineid
};