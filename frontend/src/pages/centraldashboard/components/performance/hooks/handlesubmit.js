// usePerformanceSubmit.js
import { useState } from 'react';
import { toast } from 'react-toastify';
import useAddPerformance from './addperformance';
import useAuth from '../../../../../context/useAuth';


const usePerformanceSubmit = (formData, selectedDate, selectedTurbine) => {
const {user} = useAuth();
  const [loading, setLoading] = useState(false);
  const { addperformance } = useAddPerformance();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const performanceData = {
        ...formData,
        performance_date: selectedDate.toISOString().split('T')[0],
        fuel_consumption: parseFloat(formData.fuel_consumption) || 0,
        gross_energy_production: parseFloat(formData.gross_energy_production) || 0,
        auxiliaries_consumption: parseFloat(formData.auxiliaries_consumption) || 0,
        net_active_energy_production: parseFloat(formData.net_active_energy_production) || 0,
        reactive_energy_production: parseFloat(formData.reactive_energy_production) || 0,
        startups: parseInt(formData.startups) || 0,
        ignitions: parseInt(formData.ignitions) || 0,
        couplings: parseInt(formData.couplings) || 0,
        load_trips: parseInt(formData.load_trips) || 0,
        net_energy_distribution: parseFloat(formData.net_energy_distribution) || 0,
        starts_since_last_inspection: parseInt(formData.starts_since_last_inspection) || 0,
        max_power_peak: parseFloat(formData.max_power_peak) || 0,
        flame_hours: parseFloat(formData.flame_hours) || 0,
        production_hours: parseFloat(formData.production_hours) || 0,
        daily_availability: parseFloat(formData.daily_availability) || 0,
        average_hourly_power: parseFloat(formData.average_hourly_power) || 0,
        gas_calorific_value: parseFloat(formData.gas_calorific_value) || 0,
        gasoil_calorific_value: parseFloat(formData.gasoil_calorific_value) || 0,
        specific_consumption: parseFloat(formData.specific_consumption) || 0,
        daily_availability_rate: parseFloat(formData.daily_availability_rate) || 0,
        cumulative_availability_rate: parseFloat(formData.cumulative_availability_rate) || 0,
        operating_hours_last_inspection: parseFloat(formData.operating_hours_last_inspection) || 0,
        starts_since_first_coupling: parseInt(formData.starts_since_first_coupling) || 0,
        operating_hours_since_first_coupling: parseFloat(formData.operating_hours_since_first_coupling) || 0,
        pumpable_gasoil_stock: parseFloat(formData.pumpable_gasoil_stock) || 0,
        autonomy_at_pmc: parseFloat(formData.autonomy_at_pmc) || 0,
        mwh_peak: parseFloat(formData.mwh_peak) || 0,
        mwh_tlr: parseFloat(formData.mwh_tlr) || 0,
      };

      await addperformance(performanceData, user.central_id, selectedTurbine);
      
    } catch (error) {
      console.error('Error saving performance data:', error);
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading };
};

export default usePerformanceSubmit;
