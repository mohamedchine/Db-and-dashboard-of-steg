import React, { useContext } from 'react';
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  Divider,
} from '@mui/material';

import { TurbinesContext } from '../../../../../context/turbinesContext';
import { toast } from 'react-toastify';

const PerformanceNaveBar = ({
  selectedTurbine,
  onTurbineChange,
  selectedDate,
  onDateChange,
}) => {
  const { turbines } = useContext(TurbinesContext);

  return (
    <>
      {/* Header Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
          mb: 2,
        }}
      >
        <Typography variant="h5" component="h1">
          Performance
        </Typography>

        {/* Form Controls Wrapper with Top Margin */}
        <Box sx={{ mt: 3 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            {/* Turbine Selector */}
            <FormControl sx={{ minWidth: 200 }} variant="outlined">
              <InputLabel id="turbine-select-label">Turbine</InputLabel>
              <Select
                labelId="turbine-select-label"
                id="turbine-select"
                value={selectedTurbine || ''}
                onChange={onTurbineChange}
                label="Turbine"
              >
                {turbines.map((turbine) => (
                  <MenuItem key={turbine.turbine_id} value={turbine.turbine_id}>
                    {turbine.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Date Picker */}
            <FormControl variant="outlined">
              <input
                type="date"
                id="date-input"
                value={selectedDate.toISOString().split('T')[0]}
                onChange={(e) => {
                  const pickedDate = new Date(e.target.value);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0); // Normalize today's date
              
                  if (pickedDate > today) {
                    toast.error('You cannot choose a future date.');
                    return;
                  }
              
                  onDateChange(pickedDate);
                }}
                style={{
                  padding: '10px',
                  fontSize: '1rem',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  width: '160px',
                  background: '#fff',
                }}
              />
            </FormControl>
          </Box>
        </Box>
      </Box>

      {/* Divider */}
      <Divider sx={{ mb: 2 }} />
    </>
  );
};

export default PerformanceNaveBar;