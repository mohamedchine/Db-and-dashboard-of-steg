//to get the state from al the component we can show the form in the alarms layout based on the sidebar addalarm action 
import { createContext, useContext, useState } from 'react';

const AlarmUIContext = createContext();

export const useAlarmUI = () => useContext(AlarmUIContext);
export const AlarmUIProvider = ({ children }) => {
  const [showAddAlarm, setShowAddAlarm] = useState(false);
  const [showAddMaintenance, setShowAddMaintenance] = useState(false);
  const [alarms, setAlarms] = useState([]); //  shared alarm state


  const addAlarm = (newAlarm) => {
    setAlarms((prev) => [newAlarm, ...prev]);
  };

  return (
    <AlarmUIContext.Provider
      value={{
        showAddAlarm,
        setShowAddAlarm,
        showAddMaintenance,
        setShowAddMaintenance,
        alarms,
        setAlarms,
        addAlarm, // optional helper
      }}
    >
      {children}
    </AlarmUIContext.Provider>
  );
};
