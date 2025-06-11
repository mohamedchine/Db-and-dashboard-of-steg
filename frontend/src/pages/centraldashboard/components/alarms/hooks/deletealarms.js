import { useState } from 'react';
import { toast } from 'react-toastify';
import axs from '../../../../../api/customizedaxios';


const useDeleteAlarm = (initialAlarms = []) => {
  const [alarms, setAlarms] = useState(initialAlarms);

  const deleteAlarm = async (alarmId) => {
    try {
      await axs.delete(`/alarms/delete/${alarmId}`);
      setAlarms(prev => prev.filter(alarm => alarm.id !== alarmId));
      toast.success("Alarm deleted successfully", { autoClose: 3000 });
    } catch (error) {
      console.error("Error deleting alarm:", error);
      toast.error("Failed to delete alarm", { autoClose: 3000 });
    }
  };

  return {
    alarms,
    deleteAlarm,
  };
};

export default useDeleteAlarm;
