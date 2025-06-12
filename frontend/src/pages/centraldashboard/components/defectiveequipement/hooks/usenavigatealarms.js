import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useAlarmsNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Derive active tab based on URL
  const getActiveTab = () => {
    const path = location.pathname.split('/');
    const lastSegment = path[path.length - 1];
    
    if (lastSegment === 'add') return false;
    if (lastSegment === 'fixed') return 1;
    if (lastSegment === 'pending') return 2;
    return 0; // unfixed
  };

  const [tabValue, setTabValue] = useState(getActiveTab());
  const [selectedTurbine, setSelectedTurbine] = useState('all');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 0) navigate('/central/dashboard/defective-equipement');
    else if (newValue === 1) navigate('/central/dashboard/defective-equipement/fixed');
    else if (newValue === 2) navigate('/central/dashboard/defective-equipement/pending');
  };

  const handleTurbineChange = (event) => {
    setSelectedTurbine(event.target.value);
    
  };
  const handleselectedaddalarm = ()=>{
        setTabValue(false);
       navigate('/central/dashboard/defective-equipement/add');
  }

  return {
    tabValue,
    selectedTurbine,
    handleTabChange,
    handleTurbineChange,
    handleselectedaddalarm
  };
};