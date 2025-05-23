
const {validateDefectiveEquipment} = require('../../utils/defectiveequipementsValidation');

const { 
    addDefectiveEquipment,
    getunfixeddefectiveequipments,
    getfixeddefectiveequipments,
    deleteDefectiveEquipment,
    getDefectiveEquipmentByTurbine,getpendingdefectiveequipments,
    findDefectiveEquipmentById
  } = require("../../model/defectiveequipement");
const { findMaintenanceByDefectiveEquipmentId, deleteMaintenance } = require('../../model/maintenance');
const { addactivitylog } = require('../../model/activitylogs');

const adddefectiveequipementCtrl = async(req,res)=>{
     
    const {error} = validateDefectiveEquipment(req.body);
    if(error) return res.status(400).json(error.details[0].message);

    try{
    const addedeq = await addDefectiveEquipment({
        ...req.body,
        central_id: req.params.centralid ,
      });
      const activity = {
        central_user_email: req.user.steg_email,
        action: "add",
        target_table: "defective_equipement",
        description: "added a defecitve_equipement",
        target_table_old_value: null,
        target_table_new_value: addedeq 
       }
       await addactivitylog(activity);
     



   return res.json({message : "added successfuly" ,insertedrow :addedeq});
} catch(e){
    return res.status(500).json({message : "sorry an error has hapend"  });
}

}






const deletedefectiveequipementCtrl = async (req, res) => {
  try {
    // 1. Find the defective equipment
    const equipment = await findDefectiveEquipmentById(req.params.defectiveequipementid);
    
    // 2. Check creation date
    // const today = new Date().toISOString().split('T')[0];
    // const createdDate = new Date(equipment.created_at).toISOString().split('T')[0];
    
    // if (createdDate < today) {
    //   return res.status(403).json({
    //     message: "This defective equipment wasn't added today so you can't delete it unless you request your groupement to delete it"
    //   });
    // }
    const activity = {
      central_user_email: req.user.steg_email,
      action: "delete",
      target_table: "defective_equipement",
      description: "deleted a defective_equipement",
      target_table_old_value: req.defectiveequipement,
      target_table_new_value: null
     }
    // 3. Find and delete related maintenance
    const maintenance = await findMaintenanceByDefectiveEquipmentId(equipment.id);
    if (maintenance) {
      await deleteMaintenance(maintenance.id);
      activity.consequence_table = "maintenance" ;
      activity.consequence_table_old_value = maintenance ;
      activity.consequence_table_new_value = null ;
    }

    // 4. Delete the equipment
    await deleteDefectiveEquipment(req.params.defectiveequipementid);
    await addactivitylog(activity);
    return res.status(201).json({ 
      message: "Successfully deleted defective equipment and related maintenance" 
    });

  } catch (error) {
    console.error('Error deleting defective equipment:', error);
    return res.status(500).json({
      message: "Failed to delete defective equipment",
      error: error.message
    });
  }
};









const getunfixeddefectiveequipementsCtrl = async (req, res) => {
  try {
    const { centralid } = req.params;
    const { page, limit, turbine } = req.query;

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const turbineId = turbine ? parseInt(turbine) : null;

    const data = await getunfixeddefectiveequipments(centralid, pageNum, limitNum, turbineId);

    return res.status(200).json({
      message: "Successfully fetched unfixed defective equipment",
      page: pageNum,
      limit: limitNum,
      total: data.length,
      turbine_id: turbineId,
      data
    });

  } catch (error) {
    console.error("Error fetching unfixed defective equipment:", error);
    return res.status(500).json({ message: "Failed to fetch unfixed defective equipment" });
  }
};





const getfixeddefectiveequipementsCtrl = async (req, res) => {
  try {
    const { centralid } = req.params;
    const { page, limit, turbine } = req.query;

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const turbineId = turbine ? parseInt(turbine) : null;

    const data = await getfixeddefectiveequipments(centralid, pageNum, limitNum, turbineId);

    return res.status(200).json({
      message: "Successfully fetched fixed defective equipment",
      page: pageNum,
      limit: limitNum,
      total: data.length,
      turbine_id: turbineId,
      data
    });

  } catch (error) {
    console.error("Error fetching fixed defective equipment:", error);
    return res.status(500).json({ message: "Failed to fetch fixed defective equipment" });
  }
};



const getpendingdefectiveequipementsCtrl = async (req, res) => {
  try {
    const { centralid } = req.params;
    const { page, limit, turbine } = req.query;

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const turbineId = turbine ? parseInt(turbine) : null;

    const data = await getpendingdefectiveequipments(centralid, pageNum, limitNum, turbineId);

    return res.status(200).json({
      message: "Successfully fetched pending defective equipment",
      page: pageNum,
      limit: limitNum,
      total: data.length,
      turbine_id: turbineId,
      data
    });

  } catch (error) {
    console.error("Error fetching pending defective equipment:", error);
    return res.status(500).json({ message: "Failed to fetch pending defective equipment" });
  }
};





    
module.exports = {adddefectiveequipementCtrl,deletedefectiveequipementCtrl,getunfixeddefectiveequipementsCtrl,getfixeddefectiveequipementsCtrl,getpendingdefectiveequipementsCtrl};