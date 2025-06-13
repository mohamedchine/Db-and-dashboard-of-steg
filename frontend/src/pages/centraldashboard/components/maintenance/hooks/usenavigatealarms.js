import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useAlarmsNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Derive active tab based on URL
  const getActiveTab = () => {
    const path = location.pathname.split('/');
    const lastSegment = path[path.length - 1];
    if (lastSegment === 'done') return 1;
    return 0; //ongoing
  };

  const [tabValue, setTabValue] = useState(getActiveTab());
  const [selectedTurbine, setSelectedTurbine] = useState('all');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 0) navigate('/central/dashboard/maintenance');
    else if (newValue === 1) navigate('/central/dashboard/maintenance/done');
  
  };

  const handleTurbineChange = (event) => {
    setSelectedTurbine(event.target.value);
    
  };

  return {
    tabValue,
    selectedTurbine,
    handleTabChange,
    handleTurbineChange,
  };
};