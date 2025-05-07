
const {validateDefectiveEquipment} = require('../../utils/defectiveequipementsValidation');
const { 
    addDefectiveEquipment,
    getunfixeddefectiveequipments,
    findDefectiveEquipmentById,
    deleteDefectiveEquipment,
    getDefectiveEquipmentByTurbine
  } = require("../../model/defectiveequipement");

const adddefectiveequipementCtrl = async(req,res)=>{
     
    const {error} = validateDefectiveEquipment(req.body);
    if(error) return res.status(400).json(error.details[0].message);

    try{
    const addedeq = await addDefectiveEquipment({
        ...req.body,
        reportid: req.params.reportid ,
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
const getunfixeddefectiveequipementsCtrl = async(req,res)=>{
    const unfixeddefectiveequipements = await getunfixeddefectiveequipments(req.params.centralid);
    return res.status(200).json(unfixeddefectiveequipements);
}
module.exports = {adddefectiveequipementCtrl,deletedefectiveequipementCtrl,getunfixeddefectiveequipementsCtrl};