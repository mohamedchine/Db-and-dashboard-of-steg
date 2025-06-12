import React from 'react';
import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

import AlarmsNavbar from './components/navbar';
import Pending from './components/pendingalarms';
import Resolved from './components/resolvedalarms';
import Unresolved from './components/unresolvedalarms';
import { useAlarmsNavigation } from './hooks/usenavigatealarms';
import AlarmForm from './components/addalarmform';

const Alarms = () => {
  const { tabValue, selectedTurbine, handleTabChange, handleTurbineChange ,handleselectedaddalarm} = useAlarmsNavigation();
  
  return (
    <Box sx={{ width: '100%' }}>
      <AlarmsNavbar 
        selectedTurbine={selectedTurbine}
        onTurbineChange={handleTurbineChange}
        tabValue={tabValue}
        onTabChange={handleTabChange}
        onAddAlarm={handleselectedaddalarm}
      />

      <Box sx={{ py: 2 }}>
        <Routes>
          <Route index element={<Unresolved turbineId={selectedTurbine} />} />
          <Route path="fixed" element={<Resolved turbineId={selectedTurbine} />} />
          <Route path="unfixed" element={<Pending turbineId={selectedTurbine} />} />
          <Route path="pending" element={<AlarmForm  turbineId={selectedTurbine}/>} />
        </Routes>
      </Box>
    
    </Box>
  );
};

export default Alarms;