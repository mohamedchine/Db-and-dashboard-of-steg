import { useState } from 'react';
import { toast } from 'react-toastify';
import axs from '../../../../../api/customizedaxios';


const useDeleteMaintenance = (initialMaintenances = []) => {
  const [Maintenances, setMaintenances] = useState(initialMaintenances);

  const deleteMaintenance = async (MaintenanceId) => {
    try {
      await axs.delete(`/maintenance/delete/${MaintenanceId}`);
      setMaintenances(prev => prev.filter(Maintenance => Maintenance.id !== MaintenanceId));
      toast.success("Maintenance deleted successfully");
    } catch (error) {
      console.error("Error deleting Maintenance:", error);
      toast.error("Failed to delete Maintenance");
    }
  };

  return {
    Maintenances, deleteMaintenance ,setMaintenances
  };
};

export default useDeleteMaintenance;
// src\pages\centraldashboard\components\defectiveMaintenance\hooks\deletealarms.js
