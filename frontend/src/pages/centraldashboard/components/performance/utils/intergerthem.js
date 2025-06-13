const integerdata = (formData)=>{
 // Helper function to convert to number or null
 const toNumber = (value) => {
    if (value === '' || value === null || value === undefined) return null;
    const num = parseFloat(value);
    return isNaN(num) ? null : num;
  };
  
  // Helper function to convert to integer or null
  const toInteger = (value) => {
    if (value === '' || value === null || value === undefined) return null;
    const num = parseInt(value, 10);
    return isNaN(num) ? null : num;
  };
  
  const processedData = {
    // Keep strings as strings
    fuel_type: formData.fuel_type,
    load_status: formData.load_status,
    period: formData.period,
    
    // Convert to integers
   
    
    startups: toInteger(formData.startups) || 0,
    ignitions: toInteger(formData.ignitions) || 0,
    couplings: toInteger(formData.couplings) || 0,
    load_trips: toInteger(formData.load_trips) || 0,
    starts_since_last_inspection: toInteger(formData.starts_since_last_inspection),
    operating_hours_last_inspection: toInteger(formData.operating_hours_last_inspection),
    starts_since_first_coupling: toInteger(formData.starts_since_first_coupling),
    operating_hours_since_first_coupling: toInteger(formData.operating_hours_since_first_coupling),
    
    // Convert to numbers (with decimals)
    fuel_consumption: toNumber(formData.fuel_consumption),
    gross_energy_production: toNumber(formData.gross_energy_production),
    auxiliaries_consumption: toNumber(formData.auxiliaries_consumption),
    net_active_energy_production: toNumber(formData.net_active_energy_production),
    reactive_energy_production: toNumber(formData.reactive_energy_production),
    net_energy_distribution: toNumber(formData.net_energy_distribution),
    max_power_peak: toNumber(formData.max_power_peak),
    flame_hours: toNumber(formData.flame_hours),
    production_hours: toNumber(formData.production_hours),
    daily_availability: toNumber(formData.daily_availability),
    average_hourly_power: toNumber(formData.average_hourly_power),
    gas_calorific_value: toNumber(formData.gas_calorific_value),
    gasoil_calorific_value: toNumber(formData.gasoil_calorific_value),
    specific_consumption: toNumber(formData.specific_consumption),
    daily_availability_rate: toNumber(formData.daily_availability_rate),
    cumulative_availability_rate: toNumber(formData.cumulative_availability_rate),
    pumpable_gasoil_stock: toNumber(formData.pumpable_gasoil_stock),
    autonomy_at_pmc: toNumber(formData.autonomy_at_pmc),
    mwh_peak: toNumber(formData.mwh_peak),
    mwh_tlr: toNumber(formData.mwh_tlr),
   
  };
  return processedData;
}
export default integerdata ; 
