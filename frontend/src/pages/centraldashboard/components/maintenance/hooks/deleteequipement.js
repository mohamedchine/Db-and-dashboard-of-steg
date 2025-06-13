import { useState } from 'react';
import { toast } from 'react-toastify';
import axs from '../../../../../api/customizedaxios';


const useDeleteEquipement = (initialEquipements = []) => {
  const [equipements, setEquipements] = useState(initialEquipements);

  const deleteEquipement = async (equipementId) => {
    try {
      await axs.delete(`/defectiveequipements/delete/${equipementId}`);
      setEquipements(prev => prev.filter(equipement => equipement.id !== equipementId));
      toast.success("Equipement deleted successfully");
    } catch (error) {
      console.error("Error deleting equipement:", error);
      toast.error("Failed to delete equipement");
    }
  };

  return {
    equipements, deleteEquipement ,setEquipements
  };
};

export default useDeleteEquipement;
// src\pages\centraldashboard\components\defectiveequipement\hooks\deletealarms.js
