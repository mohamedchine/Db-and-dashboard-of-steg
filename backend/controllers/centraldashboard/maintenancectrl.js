const {validatesomemaintancecstuff , validateMaintenance} = require('../../utils/maintenanceValidation'); 
const {updateAlarmStatus} = require('../../model/alarms');
const {updateDefectiveEquipmentStatus} = require('../../model/defectiveequipement')
const {addMaintenance ,deleteMaintenance ,getUndoneMaintenance ,updateMaintenanceEndDate ,findMaintenanceById,getDoneMaintenance} = require('../../model/maintenance');
const { addactivitylog } = require('../../model/activitylogs');



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
   
   
   
   
   
    let activity = {
        central_user_email: req.user.steg_email,
        action: "add",
        target_table: "maintenances",
        description: "added a maintenance",
        target_table_old_value: null,
        
       }
   
   
   
   
    // Handle maintenance completion case
    if(req.body.end) {
        if(req.alarmid) {
          const {
            oldAlarm,
            newAlarm
          } = await updateAlarmStatus(req.alarmid, req.body.end, 'Resolved');
          activity.consequence_table = "alarms" ;
          activity.consequence_table_old_value = oldAlarm;
          activity.consequence_table_new_value = newAlarm;
        }
        if(req.defecteqid) {
           const {Old, New } =  await updateDefectiveEquipmentStatus(req.defecteqid,'Fixed',req.body.end);
            activity.consequence_table = "defective_equipment" ;
            activity.consequence_table_old_value = Old;
            activity.consequence_table_new_value = New;
        }
    } 
 
    else {
        if(req.alarmid) {
        
        
        const{oldAlarm,newAlarm}=    await updateAlarmStatus(req.alarmid, null, 'Pending');
        activity.consequence_table = "alarms" ;
        activity.consequence_table_old_value = oldAlarm;
        activity.consequence_table_new_value = newAlarm;
        
        
        }
        if(req.defecteqid) {
            const {Old,New} = await updateDefectiveEquipmentStatus(
                req.defecteqid, 
                'Pending',  
                null  
            );
            activity.consequence_table = "defective_equipment" ;
            activity.consequence_table_old_value = Old;
            activity.consequence_table_new_value = New;
        }
    }

    const maintenance = await addMaintenance({
        body: req.body,
        params: req.params
    });
    activity.target_table_new_value= maintenance;
    await addactivitylog(activity);
    return res.status(201).json({message : "maintenance added successfuly" , maintenance});
};





//for the day if somoene added it today means
const deletemaintenanceCtrl = async(req,res)=>{

      //check if the maintenance was created today or not 
    //   const today = new Date().toISOString().split('T')[0];
    //   const maintenanceDate = new Date(req.maintenance.created_at).toISOString().split('T')[0];
  
    //   // Check if maintenance was created today
    //   if (maintenanceDate < today) {
    //     return res.status(403).json({
    //       message: "This maintenance wasn't added today so you can't delete it"
    //     });
    //   }
    let activity = {
        central_user_email: req.user.steg_email,
        action: "delete",
        target_table: "maintenances",
        description: "deleted a maintenance",
        target_table_old_value: null,
       }



       if(req.maintenance.related_item_type == "Defective Equipment"){
        const {Old,New} = await updateDefectiveEquipmentStatus(req.maintenance.related_item_id, "Not Fixed", null);
        activity.consequence_table = "defective_equipment" ;
        activity.consequence_table_old_value = Old;
        activity.consequence_table_new_value = New;
    }
       if(req.maintenance.related_item_type == "Alarm"){
         const{
            oldAlarm,
            newAlarm
          } =  await updateAlarmStatus(req.maintenance.related_item_id, null, "Active");
          activity.consequence_table = "alarms" ;
          activity.consequence_table_old_value = oldAlarm;
          activity.consequence_table_new_value = newAlarm;
          
    
    }    
       const {Old,New} = await deleteMaintenance(req.maintenance.id) ;
       activity.target_table_old_value = Old;
       activity.target_table_new_value = New;
       return res.status(201).json({ message: "Successfully deleted maintenance" });
}







const getundonemaintenancesCtrl = async (req, res) => {
    try {
      const { centralid } = req.params;
      const turbineId = req.query.turbine ? parseInt(req.query.turbine) : null;
  
      const data = await getUndoneMaintenance(centralid, turbineId);
  
      return res.status(200).json({
        message: "Successfully fetched undone maintenance tasks",
        data
      });
    } catch (error) {
      console.error("Error fetching undone maintenance:", error);
      return res.status(500).json({ message: "Failed to fetch undone maintenance tasks" });
    }
  };
  
  const getdoneMaintenanceCtrl = async (req, res) => {
    try {
      const { centralid } = req.params;
      const turbineId = req.query.turbine ? parseInt(req.query.turbine) : null;
  
      const data = await getDoneMaintenance(centralid, turbineId);
  
      return res.status(200).json({
        message: "Successfully fetched done maintenance tasks",
        data
      });
    } catch (error) {
      console.error("Error fetching done maintenance:", error);
      return res.status(500).json({ message: "Failed to fetch done maintenance tasks" });
    }
  };

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
        let activity = {
            central_user_email: req.user.steg_email,
            action: "update",
            target_table: "maintenances",
            description: "added a maintenance",
            target_table_old_value: maintenance,
            target_table_new_value: updatedMaintenance,
            consequence_table: maintenance.related_item_type,
           };
        // 3. Update related item based on type
        if (maintenance.related_item_type === 'Alarm' && maintenance.related_item_id) {
            const{
                oldAlarm,
                newAlarm
              } = await updateAlarmStatus(
                maintenance.related_item_id,
                endDate ? endDate : null,
                endDate ? 'Resolved' : 'Active'
            );
            activity.consequence_table_old_value = oldAlarm;
            activity.consequence_table_new_value = newAlarm;
        } else if (maintenance.related_item_type === 'Defective Equipment' && maintenance.related_item_id) {
            const{New,Old} = await updateDefectiveEquipmentStatus(
                maintenance.related_item_id,
                endDate ? 'Fixed' : 'Not Fixed',
                endDate ? endDate : null
            );
            activity.consequence_table_old_value = Old;
            activity.consequence_table_new_value = New;
        }
        await addactivitylog(activity);

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





  



module.exports = {addmaintenanceCtrl , deletemaintenanceCtrl, getundonemaintenancesCtrl , setmaintenanceenddateCtrl,getdoneMaintenanceCtrl };