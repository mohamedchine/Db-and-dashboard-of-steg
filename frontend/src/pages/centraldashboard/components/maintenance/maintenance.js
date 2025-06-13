import React from 'react';
import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';



import { useAlarmsNavigation } from './hooks/usenavigatealarms';

import Unfixed from './components/unfixeddefeq';
import Fixed from './components/fixeddefeq';
import DefectiveequipementsNavbar from './components/navbar';

const Maintenance = () => {
  const { tabValue, selectedTurbine, handleTabChange, handleTurbineChange } = useAlarmsNavigation();
  
  return (
    <Box sx={{ width: '100%' }}>
      <DefectiveequipementsNavbar 
        selectedTurbine={selectedTurbine} //to keep the turbine the same across other tabs
        onTurbineChange={handleTurbineChange}//when change it keep it the change when navigating through tabs
        tabValue={tabValue}  //heighleight 
        onTabChange={handleTabChange}   //to redirect switch the the new tabvalue and heighleight the new we cant use onclick navigate(route) in MUI because they dont allow us
      />

      <Box sx={{ py: 2 }}>
        <Routes>
          <Route index element={<Unfixed turbineId={selectedTurbine} />} />
          <Route path="done" element={<Fixed turbineId={selectedTurbine} />} />
        </Routes>
      </Box>
    
    </Box>
  );
};

export default Maintenance;