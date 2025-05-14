
const {validateDefectiveEquipment} = require('../../utils/defectiveequipementsValidation');
const {record_activity}= require("../../utils/activitylogs");
const { 
    addDefectiveEquipment,
    getunfixeddefectiveequipments,
    getfixeddefectiveequipments,
    deleteDefectiveEquipment,
    getDefectiveEquipmentByTurbine,getpendingdefectiveequipments
  } = require("../../model/defectiveequipement");

const adddefectiveequipementCtrl = async(req,res)=>{
     
    const {error} = validateDefectiveEquipment(req.body);
    if(error) return res.status(400).json(error.details[0].message);

    try{
    const addedeq = await addDefectiveEquipment({
        ...req.body,
        central_id: req.params.centralid ,
      });
      
      
     



   return res.json({message : "added successfuly" ,insertedrow :addedeq});
} catch(e){
    return res.status(500).json({message : "sorry an error has hapend"  });
}

}






const deletedefectiveequipementCtrl = async(req,res)=>{
   
   
    await deleteDefectiveEquipment(req.params.defectiveequipementid);
    


    return res.status(201).json({ message: "Successfully deleted alarm" });
  

}










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