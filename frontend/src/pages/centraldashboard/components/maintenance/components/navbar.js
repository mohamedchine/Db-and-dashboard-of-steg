import React, { useContext } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from '@mui/material';

import { TurbinesContext } from '../../../../../context/turbinesContext';

const DefectiveequipementsNavbar = ({
  selectedTurbine,
  onTurbineChange,
  tabValue,
  onTabChange,
  
}) => {
  const { turbines } = useContext(TurbinesContext);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Maintenances
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="turbine-select-label">All Turbines</InputLabel>
            <Select
              labelId="turbine-select-label"
              id="turbine-select"
              value={selectedTurbine}
              label="All Turbines"
              onChange={onTurbineChange}
            >
              <MenuItem value="all">All Turbines</MenuItem>
              {turbines.map((turbine) => (
                <MenuItem key={turbine.turbine_id} value={turbine.turbine_id}>
                  {turbine.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Tabs + Add Alarm Button Row */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: 1,
          borderColor: 'divider',
          pb: 1,
        }}
      >
        <Tabs
          value={tabValue}
          onChange={onTabChange}
          aria-label="alarm status tabs"
          variant="fullWidth"
          sx={{
            '& .MuiTabs-flexContainer': {
              // Reduce the font size of the tab labels
              fontSize: '14px', // Adjust as needed
              textTransform: 'capitalize', // Optional: Capitalize the first letter of each word
            },
          }}
        >
          <Tab
            label={
              <Box sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <Box
                  component="span"
                  sx={{
                    bgcolor: 'error.main',
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    display: 'inline-block',
                    mr: 1,
                  }}
                />
                Ongoing Maintenance
              </Box>
            }
          />
          <Tab
            label={
              <Box sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <Box
                  component="span"
                  sx={{
                    bgcolor: 'success.main',
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    display: 'inline-block',
                    mr: 1,
                  }}
                />
                Done Maintenance
              </Box>
            }
          />
        </Tabs>
      </Box>
    </>
  );
};

export default DefectiveequipementsNavbar;