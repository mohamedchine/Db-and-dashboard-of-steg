import React from 'react';
import PerformanceNaveBar from './components/navbarperformance';
import useHandleStates from './utils/handlesomestuff'
import PerformanceForm from './components/content';
const Performance = () => {
  const {
    selectedTurbine,
    selectedDate,
    handleTurbineChange,
    handleDateChange,
  } = useHandleStates();

  return (
    <div className="performance">
      <PerformanceNaveBar
        selectedTurbine={selectedTurbine}
        onTurbineChange={handleTurbineChange}
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
      />

      <PerformanceForm selectedDate = {selectedDate}  selectedTurbine={selectedTurbine}/>
    </div>
  );
};

export default Performance;