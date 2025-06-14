import React, { useState } from 'react';
import {
  Container,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Box,
  Typography,
  InputAdornment,
  Backdrop,
  CircularProgress,
} from '@mui/material';

import useGetPerformance from '../hooks/getperformance';
import useAutoCalculations from '../hooks/autocalculatefields';
import usePerformanceSubmit from '../hooks/handlesubmit';
import usePerformanceData from '../hooks/handletabchangegetperformance';
const PerformanceForm = ({selectedDate, selectedTurbine}) => {
    
    const { getperformance, loading: fetchLoading } = useGetPerformance();
    
    const [formData, setFormData] = useState({
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
    //disabled fields calculated
    useAutoCalculations(formData, setFormData);
   //save or update
    const { handleSubmit, loading } = usePerformanceSubmit(formData, selectedDate, selectedTurbine);
    //fetches data when selectioin changes
    usePerformanceData(selectedDate, selectedTurbine,  getperformance, setFormData); 
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
 
   
    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            {/* Loading Backdrop */}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading || fetchLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Add Performance
                </Typography>

                {/* Required Fields */}
                <FormControl fullWidth required sx={{ mb: 2 }}>
                    <InputLabel>Fuel Type</InputLabel>
                    <Select 
                        name="fuel_type" 
                        label="Fuel Type"
                        value={formData.fuel_type}
                        onChange={handleInputChange}
                        disabled={loading}
                    >
                        <MenuItem value="Gas">Gas</MenuItem>
                        <MenuItem value="Gas-oil">Gas-oil</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth required sx={{ mb: 2 }}>
                    <InputLabel>Load Status</InputLabel>
                    <Select 
                        name="load_status" 
                        label="Load Status"
                        value={formData.load_status}
                        onChange={handleInputChange}
                        disabled={loading}
                    >
                        <MenuItem value="No Load">No Load</MenuItem>
                        <MenuItem value="Loaded">Loaded</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth required sx={{ mb: 2 }}>
                    <InputLabel>Period</InputLabel>
                    <Select 
                        name="period" 
                        label="Period"
                        value={formData.period}
                        onChange={handleInputChange}
                        disabled={loading}
                    >
                        <MenuItem value="Day">Day</MenuItem>
                        <MenuItem value="Peak">Peak</MenuItem>
                        <MenuItem value="Night">Night</MenuItem>
                    </Select>
                </FormControl>

                {/* Optional Fields with Units */}
                <TextField 
                    name="fuel_consumption" 
                    label="Fuel Consumption" 
                    type="number" 
                    fullWidth 
                    sx={{ mb: 2 }}
                    value={formData.fuel_consumption}
                    onChange={handleInputChange}
                    disabled={loading}
                    InputProps={{ endAdornment: <InputAdornment position="end">kg/h or m³/h</InputAdornment> }}
                />

                <TextField 
                    name="gross_energy_production" 
                    label="Gross Energy Production" 
                    type="number" 
                    fullWidth 
                    sx={{ mb: 2 }}
                    value={formData.gross_energy_production}
                    onChange={handleInputChange}
                    disabled={loading}
                    InputProps={{ endAdornment: <InputAdornment position="end">MWh</InputAdornment> }}
                />

                <TextField 
                    name="auxiliaries_consumption" 
                    label="Auxiliaries Consumption" 
                    type="number" 
                    fullWidth 
                    sx={{ mb: 2 }}
                    value={formData.auxiliaries_consumption}
                    onChange={handleInputChange}
                    disabled={loading}
                    InputProps={{ endAdornment: <InputAdornment position="end">MWh</InputAdornment> }}
                />

                {/* CALCULATED FIELD */}
                <TextField 
                    name="net_active_energy_production" 
                    label="Net Active Energy Production (Auto-calculated)" 
                    type="number" 
                    fullWidth 
                    sx={{ mb: 2 }}
                    value={formData.net_active_energy_production}
                    disabled
                    InputProps={{ 
                        endAdornment: <InputAdornment position="end">MWh</InputAdornment>,
                        sx: { bgcolor: '#f5f5f5' }
                    }}
                    helperText="Calculated: Gross Energy - Auxiliaries Consumption"
                />

                <TextField 
                    name="reactive_energy_production" 
                    label="Reactive Energy Production" 
                    type="number" 
                    fullWidth 
                    sx={{ mb: 2 }}
                    value={formData.reactive_energy_production}
                    onChange={handleInputChange}
                    disabled={loading}
                    InputProps={{ endAdornment: <InputAdornment position="end">MVArh</InputAdornment> }}
                />

                {/* Counters */}
                <TextField 
                    name="startups" 
                    label="Startups" 
                    type="number" 
                    fullWidth 
                    sx={{ mb: 2 }}
                    value={formData.startups}
                    onChange={handleInputChange}
                    disabled={loading}
                    helperText="Unit: count"
                />
                <TextField 
                    name="ignitions" 
                    label="Ignitions" 
                    type="number" 
                    fullWidth 
                    sx={{ mb: 2 }}
                    value={formData.ignitions}
                    onChange={handleInputChange}
                    disabled={loading}
                    helperText="Unit: count"
                />
                <TextField 
                    name="couplings" 
                    label="Couplings" 
                    type="number" 
                    fullWidth 
                    sx={{ mb: 2 }}
                    value={formData.couplings}
                    onChange={handleInputChange}
                    disabled={loading}
                    helperText="Unit: count"
                />
                <TextField 
                    name="load_trips" 
                    label="Load Trips" 
                    type="number" 
                    fullWidth 
                    sx={{ mb: 2 }}
                    value={formData.load_trips}
                    onChange={handleInputChange}
                    disabled={loading}
                    helperText="Unit: count"
                />

                {/* More Numeric Inputs */}
                <TextField 
                    name="net_energy_distribution" 
                    label="Net Energy Distribution" 
                    type="number" 
                    fullWidth 
                    sx={{ mb: 2 }}
                    value={formData.net_energy_distribution}
                    onChange={handleInputChange}
                    disabled={loading}
                    InputProps={{ endAdornment: <InputAdornment position="end">MWh</InputAdornment> }}
                />

                <TextField 
                    name="starts_since_last_inspection" 
                    label="Starts Since Last Inspection" 
                    type="number" 
                    fullWidth 
                    sx={{ mb: 2 }}
                    value={formData.starts_since_last_inspection}
                    onChange={handleInputChange}
                    disabled={loading}
                    helperText="Unit: count"
                />

                <TextField 
                    name="max_power_peak" 
                    label="Max Power Peak" 
                    type="number" 
                    fullWidth 
                    sx={{ mb: 2 }}
                    value={formData.max_power_peak}
                    onChange={handleInputChange}
                    disabled={loading}
                    InputProps={{ endAdornment: <InputAdornment position="end">MW</InputAdornment> }}
                />

                <TextField 
                    name="flame_hours" 
                    label="Flame Hours" 
                    type="number" 
                    fullWidth 
                    sx={{ mb: 2 }}
                    value={formData.flame_hours}
                    onChange={handleInputChange}
                    disabled={loading}
                    InputProps={{ endAdornment: <InputAdornment position="end">hours</InputAdornment> }}
                />

                <TextField 
                    name="production_hours" 
                    label="Production Hours" 
                    type="number" 
                    fullWidth 
                    sx={{ mb: 2 }}
                    value={formData.production_hours}
                    onChange={handleInputChange}
                    disabled={loading}
                    InputProps={{ endAdornment: <InputAdornment position="end">hours</InputAdornment> }}
                />

                <TextField 
                    name="daily_availability" 
                    label="Daily Availability" 
                    type="number" 
                    fullWidth 
                    sx={{ mb: 2 }}
                    value={formData.daily_availability}
                    onChange={handleInputChange}
                    disabled={loading}
                    InputProps={{ endAdornment: <InputAdornment position="end">hours</InputAdornment> }}
                />

                {/* CALCULATED FIELD */}
                <TextField 
                    name="average_hourly_power" 
                    label="Average Hourly Power (Auto-calculated)" 
                    type="number" 
                    fullWidth 
                    sx={{ mb: 2 }}
                    value={formData.average_hourly_power}
                    disabled
                    InputProps={{ 
                        endAdornment: <InputAdornment position="end">MW</InputAdornment>,
                        sx: { bgcolor: '#f5f5f5' }
                    }}
                    helperText="Calculated: Net Energy ÷ Production Hours"
                />

                <TextField 
                    name="gas_calorific_value" 
                    label="Gas Calorific Value" 
                    type="number" 
                    fullWidth 
                    sx={{ mb: 2 }}
                    value={formData.gas_calorific_value}
                    onChange={handleInputChange}
                    disabled={loading}
                    InputProps={{ endAdornment: <InputAdornment position="end">kWh/m³</InputAdornment> }}
                />

                <TextField 
                    name="gasoil_calorific_value" 
                    label="Gasoil Calorific Value" 
                    type="number" 
                    fullWidth 
                    sx={{ mb: 2 }}
                    value={formData.gasoil_calorific_value}
                    onChange={handleInputChange}
                    disabled={loading}
                    InputProps={{ endAdornment: <InputAdornment position="end">kWh/kg</InputAdornment> }}
                />

                {/* CALCULATED FIELD */}
                <TextField 
                    name="specific_consumption" 
                    label="Specific Consumption (Auto-calculated)" 
                    type="number" 
                    fullWidth 
                    sx={{ mb: 2 }}
                    value={formData.specific_consumption}
                    disabled
                    InputProps={{ 
                        endAdornment: <InputAdornment position="end">m³/MWh or kg/MWh</InputAdornment>,
                        sx: { bgcolor: '#f5f5f5' }
                    }}
                    helperText="Calculated: Fuel Consumption ÷ Net Energy"
                />

                {/* CALCULATED FIELD */}
                <TextField 
                    name="daily_availability_rate" 
                    label="Daily Availability Rate (Auto-calculated)" 
                    type="number" 
                    fullWidth 
                    sx={{ mb: 2 }}
                    value={formData.daily_availability_rate}
                    disabled
                    InputProps={{ 
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        sx: { bgcolor: '#f5f5f5' }
                    }}
                    helperText="Calculated: (Daily Availability ÷ 24) × 100"
                />

                <TextField 
                    name="cumulative_availability_rate" 
                    label="Cumulative Availability Rate" 
                    type="number" 
                    fullWidth 
                    sx={{ mb: 2 }}
                    value={formData.cumulative_availability_rate}
                    onChange={handleInputChange}
                    disabled={loading}
                    InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
                />

                <TextField 
                    name="operating_hours_last_inspection" 
                    label="Operating Hours Since Last Inspection" 
                    type="number" 
                    fullWidth 
                    sx={{ mb: 2 }}
                    value={formData.operating_hours_last_inspection}
                    onChange={handleInputChange}
                    disabled={loading}
                    helperText="Unit: hours"
                />

                <TextField 
                    name="starts_since_first_coupling" 
                    label="Starts Since First Coupling" 
                    type="number" 
                    fullWidth 
                    sx={{ mb: 2 }}
                    value={formData.starts_since_first_coupling}
                    onChange={handleInputChange}
                    disabled={loading}
                    helperText="Unit: count"
                />

                <TextField 
                    name="operating_hours_since_first_coupling" 
                    label="Operating Hours Since First Coupling" 
                    type="number" 
                    fullWidth 
                    sx={{ mb: 2 }}
                    value={formData.operating_hours_since_first_coupling}
                    onChange={handleInputChange}
                    disabled={loading}
                    helperText="Unit: hours"
                />

                <TextField 
                    name="pumpable_gasoil_stock" 
                    label="Pumpable Gasoil Stock" 
                    type="number" 
                    fullWidth 
                    sx={{ mb: 2 }}
                    value={formData.pumpable_gasoil_stock}
                    onChange={handleInputChange}
                    disabled={loading}
                    InputProps={{ endAdornment: <InputAdornment position="end">m³</InputAdornment> }}
                />

                {/* CALCULATED FIELD */}
                <TextField 
                    name="autonomy_at_pmc" 
                    label="Autonomy at PMC (Auto-calculated)" 
                    type="number" 
                    fullWidth 
                    sx={{ mb: 2 }}
                    value={formData.autonomy_at_pmc}
                    disabled
                    InputProps={{ 
                        endAdornment: <InputAdornment position="end">hours</InputAdornment>,
                        sx: { bgcolor: '#f5f5f5' }
                    }}
                    helperText="Calculated: Gasoil Stock ÷ Fuel Consumption"
                />

                <TextField 
                    name="mwh_peak" 
                    label="MWh Peak" 
                    type="number" 
                    fullWidth 
                    sx={{ mb: 2 }}
                    value={formData.mwh_peak}
                    onChange={handleInputChange}
                    disabled={loading}
                    InputProps={{ endAdornment: <InputAdornment position="end">MWh</InputAdornment> }}
                />

                <TextField 
                    name="mwh_tlr" 
                    label="MWh TLR" 
                    type="number" 
                    fullWidth 
                    sx={{ mb: 2 }}
                    value={formData.mwh_tlr}
                    onChange={handleInputChange}
                    disabled={loading}
                    InputProps={{ endAdornment: <InputAdornment position="end">MWh</InputAdornment> }}
                />

                {/* Save Button */}
                <Box className="button-container" sx={{ textAlign: 'right', mt: 3 }}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        type="submit"
                        disabled={loading}
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default PerformanceForm;