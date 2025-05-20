const db = require('../config/db');
const { deletemaintenanceCtrl } = require('../controllers/centraldashboard/maintenancectrl');
const { deletealarm, updateAlarmStatus } = require("../model/alarms");
const { deleteDefectiveEquipment, updateDefectiveEquipmentStatus } = require("../model/defectiveequipement");
const { deleteMaintenance, findMaintenanceByDefectiveEquipmentId, findmaintenancebyalarmid } = require("../model/maintenance");
const { updateperformance, addperformance, getperformancebyturbinedate } = require("../model/performance");

const runmodification = async(modificationrequest) => {
    if(modificationrequest.table_name == 'performance'){
        const {
            performance_date,
            fuel_type,
            load_status,
            period,
            fuel_consumption,
            gross_energy_production,
            auxiliaries_consumption,
            net_active_energy_production,
            reactive_energy_production,
            startups,
            ignitions,
            couplings,
            load_trips,
            net_energy_distribution,
            starts_since_last_inspection,
            max_power_peak,
            flame_hours,
            production_hours,
            daily_availability,
            average_hourly_power,
            gas_calorific_value,
            gasoil_calorific_value,
            specific_consumption,
            daily_availability_rate,
            cumulative_availability_rate,
            operating_hours_last_inspection,
            starts_since_first_coupling,
            operating_hours_since_first_coupling,
            pumpable_gasoil_stock,
            autonomy_at_pmc,
            mwh_peak,
            mwh_tlr
        } = modificationrequest.new_value;
        
        // Extract centralid and turbineid from the old_value
        const { central_id: centralid, turbine_id: turbineid } = modificationrequest.old_value;
        
        // Check if we need to insert or update
        if(modificationrequest.old_valued == null){
            // Add new performance record
            await addperformance(
                centralid,
                turbineid,
                performance_date,
                fuel_type,
                load_status,
                period,
                fuel_consumption,
                gross_energy_production,
                auxiliaries_consumption,
                net_active_energy_production,
                reactive_energy_production,
                startups,
                ignitions,
                couplings,
                load_trips,
                net_energy_distribution,
                starts_since_last_inspection,
                max_power_peak,
                flame_hours,
                production_hours,
                daily_availability,
                average_hourly_power,
                gas_calorific_value,
                gasoil_calorific_value,
                specific_consumption,
                daily_availability_rate,
                cumulative_availability_rate,
                operating_hours_last_inspection,
                starts_since_first_coupling,
                operating_hours_since_first_coupling,
                pumpable_gasoil_stock,
                autonomy_at_pmc,
                mwh_peak,
                mwh_tlr
            );
        } else {
            // Update existing performance record
            await updateperformance(
                modificationrequest.record_id,
                fuel_type,
                load_status,
                period,
                fuel_consumption,
                gross_energy_production,
                auxiliaries_consumption,
                net_active_energy_production,
                reactive_energy_production,
                startups,
                ignitions,
                couplings,
                load_trips,
                net_energy_distribution,
                starts_since_last_inspection,
                max_power_peak,
                flame_hours,
                production_hours,
                daily_availability,
                average_hourly_power,
                gas_calorific_value,
                gasoil_calorific_value,
                specific_consumption,
                daily_availability_rate,
                cumulative_availability_rate,
                operating_hours_last_inspection,
                starts_since_first_coupling,
                operating_hours_since_first_coupling,
                pumpable_gasoil_stock,
                autonomy_at_pmc,
                mwh_peak,
                mwh_tlr
            ); 
        }
    }
    //user can only delete this stuff he cant update em so the request would be just delete 
    else if(modificationrequest.table_name == "defectiveequipement"){
        //find its maintenance 
        const maintenance = await findMaintenanceByDefectiveEquipmentId(modificationrequest.record_id);
        if (maintenance) {
            await deleteMaintenance(maintenance.id);
        }
        await deleteDefectiveEquipment(modificationrequest.record_id);
    }
    else if(modificationrequest.table_name == "alarms"){
        //find and delete its maintenance if it exists
        const maintenance = await findmaintenancebyalarmid(modificationrequest.record_id);
        if(maintenance){
            await deleteMaintenance(maintenance.id);
        } 
        await deletealarm(modificationrequest.record_id); 
    }
    else if(modificationrequest.table_name == "maintenance"){
        // find its related item and delete it 
        if(modificationrequest.old_value.related_item_type == "Defective Equipment"){
            await updateDefectiveEquipmentStatus(modificationrequest.old_value.related_item_id, "Not Fixed", null);
        }
        if(modificationrequest.old_value.related_item_type == "Alarm"){
            await updateAlarmStatus(modificationrequest.old_value.related_item_id, null, "Active");
        }    
        await deleteMaintenance(modificationrequest.record_id); 
    }
    return "modification completed successfully";
}

module.exports = {runmodification};