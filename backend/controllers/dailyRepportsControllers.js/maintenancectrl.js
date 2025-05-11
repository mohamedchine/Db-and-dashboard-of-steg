const {validatesomemaintancecstuff , validateMaintenance} = require('../../utils/maintenanceValidation'); 
const {updateAlarmStatus} = require('../../model/alarms');
const {updateDefectiveEquipmentStatus} = require('../../model/defectiveequipement')
const {addMaintenance ,deleteMaintenance ,getUndoneMaintenance ,updateMaintenanceEndDate ,findMaintenanceById,getTodayMaintenance} = require('../../model/maintenance');



const addmaintenanceCtrl = async(req, res) => {
    const {error} = validateMaintenance(req.body);
    if(error) return res.status(400).json({message: error.details[0].message});
    
    const {valid, message} = await validatesomemaintancecstuff(
        req, 
        req.body.type, 
        req.body.related_item_type, 
        req.body.related_item_id, 
        req.user.central_id
    );
    if(!valid) return res.status(400).json({message});

    // Handle maintenance completion case
    if(req.body.end) {
        if(req.alarmid) {
          await updateAlarmStatus(req.alarmid, req.body.end, 'Resolved');
        }
        if(req.defecteqid) {
            await updateDefectiveEquipmentStatus(
                req.defecteqid, 
                'Fixed',  
                req.body.end
            );
        }
    } 
 
    else {
        if(req.alarmid) {
            await updateAlarmStatus(req.alarmid, null, 'Pending');
        }
        if(req.defecteqid) {
            await updateDefectiveEquipmentStatus(
                req.defecteqid, 
                'Pending',  
                null  
            );
        }
    }

    const maintenance = await addMaintenance({
        body: req.body,
        params: req.params
    });

    return res.status(201).json(maintenance);
};





//for the day if somoene added it today means
const deletemaintenanceCtrl = async(req,res)=>{
       if(req.maintenance.related_item_type == "Defective Equipment"){
        await updateDefectiveEquipmentStatus(req.maintenance.related_item_id, "Not Fixed", null);
       }
       if(req.maintenance.related_item_type == "Alarm"){
        await updateAlarmStatus(req.maintenance.related_item_id, null, "Active");
       }    
       await deleteMaintenance(req.maintenance.id) ;

       return res.status(201).json({ message: "Successfully deleted maintenance" });




}







const getundonemaintenancesCtrl = async(req,res)=>{
       const maintenances = await getUndoneMaintenance(req.params.centralid) ;
       return res.status(201).json(maintenances);
}


const setmaintenanceenddateCtrl = async (req, res) => {
    try {
        const maintenanceId = req.params.id;
        const endDate = req.body.end; // Expecting ISO format like '2025-05-15T14:30:00Z'
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        
        // 1. Get the maintenance record
        const maintenance = await findMaintenanceById(maintenanceId);
        if (!maintenance || maintenance === -1) {
            return res.status(404).json({ message: "Maintenance not found" });
        }

        // Validate end date is after start date
        if (endDate) {
            const startDate = new Date(maintenance.start);
            const proposedEndDate = new Date(endDate);
            
            if (proposedEndDate <= startDate) {
                return res.status(400).json({ 
                    message: "Maintenance end date must be after start date",
                    details: {
                        start_date: maintenance.start,
                        attempted_end_date: endDate
                    }
                });
            }
        }

        // Check if maintenance already has an end date and wasn't updated today
        if (maintenance.end) {
            const lastUpdatedDate = maintenance.updated_at?.toISOString().split('T')[0];
            if (!lastUpdatedDate || lastUpdatedDate !== today) {
                return res.status(400).json({ 
                    message: "Maintenance already ended and cannot be modified" 
                });
            }
        }

        // 2. Update the maintenance end date
        const updatedMaintenance = await updateMaintenanceEndDate(maintenanceId, endDate);

        // 3. Update related item based on type
        if (maintenance.related_item_type === 'Alarm' && maintenance.related_item_id) {
            await updateAlarmStatus(
                maintenance.related_item_id,
                endDate ? endDate : null,
                endDate ? 'Resolved' : 'Active'
            );
        } else if (maintenance.related_item_type === 'Defective Equipment' && maintenance.related_item_id) {
            await updateDefectiveEquipmentStatus(
                maintenance.related_item_id,
                endDate ? 'Fixed' : 'Not Fixed',
                endDate ? endDate : null
            );
        }

        return res.status(200).json({
            message: "Maintenance and related item updated successfully",
            maintenance: updatedMaintenance
        });

    } catch (error) {
        console.error("Error updating maintenance:", error);
        return res.status(500).json({ 
            message: "Internal server error",
            error: error.message 
        });
    }
};


const gettodayandundonemaintenanceCtrl = async (req, res) => {
    try {
      const centralId = req.params.centralid;
      
      const today = await getTodayMaintenance(centralId);
      const undone = await getUndoneMaintenance(centralId);
  
      res.status(200).json({
        today: today === -1 ? [] : today,
        undone: undone === -1 ? [] : undone
      });
  
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Server error" });
    }
  };

module.exports = {addmaintenanceCtrl , deletemaintenanceCtrl, getundonemaintenancesCtrl , setmaintenanceenddateCtrl , gettodayandundonemaintenanceCtrl};