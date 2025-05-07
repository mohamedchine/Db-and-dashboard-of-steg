
const {validateDefectiveEquipment} = require('../../utils/defectiveequipementsValidation');
const { 
    addDefectiveEquipment,
    findDefectiveEquipmentById,
    deleteDefectiveEquipment,
    getDefectiveEquipmentByTurbine
  } = require("../../model/defectiveequipement");

const adddefectiveequipementCtrl = async(req,res)=>{
     
    const {error} = validateDefectiveEquipment(req.body);
    if(error) return res.status(400).json(error.details[0].message);

    try{
    await addDefectiveEquipment({
        ...req.body,
        reportid: req.params.reportid ,
      });
    
   return res.json("added successfuly");
} catch(e){
    return res.status(500).json({message : "sorry an error has hapend"});
}

}
module.exports = {adddefectiveequipementCtrl};