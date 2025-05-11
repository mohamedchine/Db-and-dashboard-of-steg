
const {validateDefectiveEquipment} = require('../../utils/defectiveequipementsValidation');
const {record_activity}= require("../../utils/activitylogs");
const { 
    addDefectiveEquipment,
    getunfixeddefectiveequipments,
    findDefectiveEquipmentById,
    deleteDefectiveEquipment,
    getDefectiveEquipmentByTurbine,todaysdefectiveequipments,getDefectiveEquipmentByReportId
  } = require("../../model/defectiveequipement");

const adddefectiveequipementCtrl = async(req,res)=>{
     
    const {error} = validateDefectiveEquipment(req.body);
    if(error) return res.status(400).json(error.details[0].message);

    try{
    const addedeq = await addDefectiveEquipment({
        ...req.body,
        reportid: req.params.reportid ,
      });
      
      
      await record_activity(req, "add", "defectiveequipement", null, "added an alarm");



   return res.json({message : "added successfuly" ,insertedrow :addedeq});
} catch(e){
    return res.status(500).json({message : "sorry an error has hapend"  });
}

}






const deletedefectiveequipementCtrl = async(req,res)=>{
   
   
    await deleteDefectiveEquipment(req.params.defectiveequipementid);
    await record_activity(req, "delete", "defectiveequipement", null, "deleted a defectiveequipement");


    return res.status(201).json({ message: "Successfully deleted alarm" });
  

}











const getunfixeddefectiveequipementsCtrl = async(req,res)=>{



    const unfixeddefectiveequipements = await getunfixeddefectiveequipments(req.params.centralid);
    return res.status(200).json(unfixeddefectiveequipements);



}





const gettodaysdefectiveequipementsCtrl = async(req,res)=>{
    const dfqtoday = await todaysdefectiveequipments(req.params.centralid);
    return res.status(200).json(dfqtoday);
}


const getreportdateandnotfixeddefectiveeqCtrl = async (req, res) => {
    try {
      const centralid = req.user.central_id;
      const reportid = req.params.reportid;

  
      // Get both datasets in parallel
      const [reportDefective, unresolvedCentralDefective] = await Promise.all([
        getDefectiveEquipmentByReportId(reportid),
        getunfixeddefectiveequipments(centralid)
      ]);
  
      return res.status(200).json({
        report_defective: reportDefective,
        unresolved_central_defective: unresolvedCentralDefective
      });
  
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Server error" });
    }
  };
    
module.exports = {adddefectiveequipementCtrl,deletedefectiveequipementCtrl,getunfixeddefectiveequipementsCtrl,gettodaysdefectiveequipementsCtrl,getreportdateandnotfixeddefectiveeqCtrl};