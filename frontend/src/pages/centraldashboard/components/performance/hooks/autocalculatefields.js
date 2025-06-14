// useAutoCalculations.js
import { useEffect } from 'react';

const useAutoCalculations = (formData, setFormData) => {
  // Net Active Energy Production = Gross - Auxiliaries
  useEffect(() => {
    const gross = parseFloat(formData.gross_energy_production) || 0;
    const auxiliaries = parseFloat(formData.auxiliaries_consumption) || 0;
    const netActive = gross - auxiliaries;
    setFormData((prev) => ({
      ...prev,
      net_active_energy_production: netActive.toString(),
    }));
  }, [formData.gross_energy_production, formData.auxiliaries_consumption]);

  // Average Hourly Power = Net / Production Hours
  useEffect(() => {
    const netEnergy = parseFloat(formData.net_active_energy_production) || 0;
    const productionHours = parseFloat(formData.production_hours) || 0;
    const averageHourlyPower = productionHours > 0 ? netEnergy / productionHours : 0;
    setFormData((prev) => ({
      ...prev,
      average_hourly_power: averageHourlyPower.toString(),
    }));
  }, [formData.net_active_energy_production, formData.production_hours]);

  // Specific Consumption = Fuel / Net
  useEffect(() => {
    const fuelConsumption = parseFloat(formData.fuel_consumption) || 0;
    const netEnergy = parseFloat(formData.net_active_energy_production) || 0;
    const specificConsumption = netEnergy > 0 ? fuelConsumption / netEnergy : 0;
    setFormData((prev) => ({
      ...prev,
      specific_consumption: specificConsumption.toString(),
    }));
  }, [formData.fuel_consumption, formData.net_active_energy_production]);

  // Daily Availability Rate = (Daily Availability / 24) * 100
  useEffect(() => {
    const dailyAvailability = parseFloat(formData.daily_availability) || 0;
    const dailyAvailabilityRate = (dailyAvailability / 24) * 100;
    setFormData((prev) => ({
      ...prev,
      daily_availability_rate: dailyAvailabilityRate.toString(),
    }));
  }, [formData.daily_availability]);

  // Autonomy at PMC = Gasoil Stock / Fuel Consumption
  useEffect(() => {
    const gasoilStock = parseFloat(formData.pumpable_gasoil_stock) || 0;
    const fuelConsumption = parseFloat(formData.fuel_consumption) || 0;
    const autonomy = fuelConsumption > 0 ? gasoilStock / fuelConsumption : 0;
    setFormData((prev) => ({
      ...prev,
      autonomy_at_pmc: autonomy.toString(),
    }));
  }, [formData.pumpable_gasoil_stock, formData.fuel_consumption]);

  return null; 
};

export default useAutoCalculations;