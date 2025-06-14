// hooks/usePerformanceData.js
import { useEffect } from 'react';
import useAuth from '../../../../../context/useAuth';

const usePerformanceData = (selectedDate, selectedTurbine,  getperformance, setFormData) => {
    const {user} = useAuth();
    useEffect(() => {
        console.log('Effect triggered:', { selectedDate, selectedTurbine, centralId: user.central_id });

        const fetchPerformanceData = async () => {
          
                console.log('Fetching data...');
                try {
                    const performanceData = await getperformance(user.central_id, selectedDate, selectedTurbine);
                    console.log('Data received:', performanceData);

                    if (performanceData && performanceData.length > 0) {
                        const data = performanceData[0];
                        setFormData({
                            fuel_type: data.fuel_type || '',
                            load_status: data.load_status || '',
                            period: data.period || '',
                            fuel_consumption: data.fuel_consumption || '',
                            gross_energy_production: data.gross_energy_production || '',
                            auxiliaries_consumption: data.auxiliaries_consumption || '',
                            net_active_energy_production: data.net_active_energy_production || '',
                            reactive_energy_production: data.reactive_energy_production || '',
                            startups: data.startups || 0,
                            ignitions: data.ignitions || 0,
                            couplings: data.couplings || 0,
                            load_trips: data.load_trips || 0,
                            net_energy_distribution: data.net_energy_distribution || '',
                            starts_since_last_inspection: data.starts_since_last_inspection || '',
                            max_power_peak: data.max_power_peak || '',
                            flame_hours: data.flame_hours || '',
                            production_hours: data.production_hours || '',
                            daily_availability: data.daily_availability || '',
                            average_hourly_power: data.average_hourly_power || '',
                            gas_calorific_value: data.gas_calorific_value || '',
                            gasoil_calorific_value: data.gasoil_calorific_value || '',
                            specific_consumption: data.specific_consumption || '',
                            daily_availability_rate: data.daily_availability_rate || '',
                            cumulative_availability_rate: data.cumulative_availability_rate || '',
                            operating_hours_last_inspection: data.operating_hours_last_inspection || '',
                            starts_since_first_coupling: data.starts_since_first_coupling || '',
                            operating_hours_since_first_coupling: data.operating_hours_since_first_coupling || '',
                            pumpable_gasoil_stock: data.pumpable_gasoil_stock || '',
                            autonomy_at_pmc: data.autonomy_at_pmc || '',
                            mwh_peak: data.mwh_peak || '',
                            mwh_tlr: data.mwh_tlr || '',
                        });
                    } else {
                        // Reset form if no data found
                        setFormData({
                            fuel_type: '',
                            load_status: '',
                            period: '',
                            fuel_consumption: '',
                            gross_energy_production: '',
                            auxiliaries_consumption: '',
                            net_active_energy_production: '',
                            reactive_energy_production: '',
                            startups: 0,
                            ignitions: 0,
                            couplings: 0,
                            load_trips: 0,
                            net_energy_distribution: '',
                            starts_since_last_inspection: '',
                            max_power_peak: '',
                            flame_hours: '',
                            production_hours: '',
                            daily_availability: '',
                            average_hourly_power: '',
                            gas_calorific_value: '',
                            gasoil_calorific_value: '',
                            specific_consumption: '',
                            daily_availability_rate: '',
                            cumulative_availability_rate: '',
                            operating_hours_last_inspection: '',
                            starts_since_first_coupling: '',
                            operating_hours_since_first_coupling: '',
                            pumpable_gasoil_stock: '',
                            autonomy_at_pmc: '',
                            mwh_peak: '',
                            mwh_tlr: '',
                        });
                    }
                } catch (error) {
                    console.error('Error fetching performance data:', error);
                }
        };

        fetchPerformanceData();
    }, [selectedDate, selectedTurbine]);
};

export default usePerformanceData;