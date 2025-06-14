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
        fuel_consumption: parseFloat(formData.fuel_consumption) || null,
        gross_energy_production: parseFloat(formData.gross_energy_production) || null,
        auxiliaries_consumption: parseFloat(formData.auxiliaries_consumption) || null,
        net_active_energy_production: parseFloat(formData.net_active_energy_production) || null,
        reactive_energy_production: parseFloat(formData.reactive_energy_production) || null,
        startups: parseInt(formData.startups) || 0,
        ignitions: parseInt(formData.ignitions) || 0,
        couplings: parseInt(formData.couplings) || 0,
        load_trips: parseInt(formData.load_trips) || 0,
        net_energy_distribution: parseFloat(formData.net_energy_distribution) || null,
        starts_since_last_inspection: parseInt(formData.starts_since_last_inspection) || null,
        max_power_peak: parseFloat(formData.max_power_peak) || null,
        flame_hours: parseFloat(formData.flame_hours) || null,
        production_hours: parseFloat(formData.production_hours) || null,
        daily_availability: parseFloat(formData.daily_availability) || null,
        average_hourly_power: parseFloat(formData.average_hourly_power) || null,
        gas_calorific_value: parseFloat(formData.gas_calorific_value) || null,
        gasoil_calorific_value: parseFloat(formData.gasoil_calorific_value) || null,
        specific_consumption: parseFloat(formData.specific_consumption) || null,
        daily_availability_rate: parseFloat(formData.daily_availability_rate) || null,
        cumulative_availability_rate: parseFloat(formData.cumulative_availability_rate) || null,
        operating_hours_last_inspection: parseFloat(formData.operating_hours_last_inspection) || null,
        starts_since_first_coupling: parseInt(formData.starts_since_first_coupling) || null,
        operating_hours_since_first_coupling: parseFloat(formData.operating_hours_since_first_coupling) || null,
        pumpable_gasoil_stock: parseFloat(formData.pumpable_gasoil_stock) || null,
        autonomy_at_pmc: parseFloat(formData.autonomy_at_pmc) || null,
        mwh_peak: parseFloat(formData.mwh_peak) || null,
        mwh_tlr: parseFloat(formData.mwh_tlr) || null,
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
