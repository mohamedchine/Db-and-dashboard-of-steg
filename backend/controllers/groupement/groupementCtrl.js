const { getCentralNameById, getTurbinesByCentralId, getCentralsnameandidByGroupementId } = require('../../model/central');
const {getconsumptionbyturbineid,getavailabilitybyturbineid , getproductionbyturbineid} =require('../../model/performance');
const {getMaintenanceByPeriodAndCentralId} =require('../../model/maintenance');
const {getDefectiveEquipmentByPeriodAndCentralId} = require('../../model/defectiveequipement');
const {getAlarmsByPeriodAndCentralId} = require('../../model/alarms');
const getcentralsdatabyperiodeCtrl = async (req, res) => {
  try {
    const periode = req.body;
    const centrals = req.centralids;

    // Validate period
    if (!periode || !periode.start || !periode.end) {
      return res.status(400).json({
        success: false,
        message: 'Invalid period. Please provide start and end dates.'
      });
    }

    // Initialize result object
    const result = [];

    // Process each central
    for (const centralId of centrals) {
      // Get central name
      const centralName = await getCentralNameById(centralId);

      // Create a central object
      const centralData = {
        central_id: centralId,
        central_name: centralName,
        production: { turbines: {}, total: {} },
        availability: { turbines: {}, average: {} },
        consumption: { turbines: {}, total: {}, average: {} }
      };

      // Get all turbines for this central
      const turbines = await getTurbinesByCentralId(centralId);

      // Initialize totals/averages
      let totalGrossProduction = 0;
      let totalAuxiliaries = 0;
      let totalNetProduction = 0;
      let totalAvailableHours = 0;
      let totalOperatingHours = 0;
      let totalFuelConsumption = 0;
      let specificConsumptionSum = 0;
      let activeTurbinesCount = 0;

      // Process each turbine
      for (const turbine of turbines) {
        const turbineId = turbine.turbine_id;
        const turbineName = turbine.name;

        // Production data
        const productionData = await getproductionbyturbineid(turbineId, periode);
        centralData.production.turbines[turbineName] = {
          gross_production: productionData.gross_production || 0,
          auxiliaries_consumption: productionData.auxiliaries_consumption || 0,
          net_production: productionData.net_production || 0
        };
        totalGrossProduction += Number(productionData.gross_production || 0);
        totalAuxiliaries += Number(productionData.auxiliaries_consumption || 0);
        totalNetProduction += Number(productionData.net_production || 0);

        // Availability data
        const availabilityData = await getavailabilitybyturbineid(turbineId, periode);
        centralData.availability.turbines[turbineName] = {
          available_hours: availabilityData.available_hours || 0,
          operating_hours: availabilityData.operating_hours || 0,
          availability_rate: availabilityData.availability_rate || '0.00'
        };
        totalAvailableHours += Number(availabilityData.available_hours || 0);
        totalOperatingHours += Number(availabilityData.operating_hours || 0);

        // Consumption data
        const consumptionData = await getconsumptionbyturbineid(turbineId, periode);
        centralData.consumption.turbines[turbineName] = {
          fuel_consumption: consumptionData.fuel_consumption || 0,
          specific_consumption: consumptionData.specific_consumption || '0.0000'
        };
        totalFuelConsumption += Number(consumptionData.fuel_consumption || 0);

        if (Number(consumptionData.specific_consumption) > 0) {
          specificConsumptionSum += Number(consumptionData.specific_consumption);
          activeTurbinesCount++;
        }
      }

      // Calculate and store totals/averages

      // Production totals
      centralData.production.total = {
        gross_production: totalGrossProduction,
        auxiliaries_consumption: totalAuxiliaries,
        net_production: totalNetProduction
      };

      // Availability averages
      const totalHours = turbines.length * 24 * ((new Date(periode.end) - new Date(periode.start)) / (1000 * 60 * 60 * 24) + 1);
      const avgAvailabilityRate = totalHours > 0 ? (totalAvailableHours / totalHours * 100).toFixed(2) : '0.00';

      centralData.availability.average = {
        available_hours: (totalAvailableHours / turbines.length).toFixed(2),
        operating_hours: (totalOperatingHours / turbines.length).toFixed(2),
        availability_rate: avgAvailabilityRate
      };

      // Consumption totals and averages
      const avgSpecificConsumption = activeTurbinesCount > 0
        ? (specificConsumptionSum / activeTurbinesCount).toFixed(4)
        : '0.0000';

      centralData.consumption.total = {
        fuel_consumption: totalFuelConsumption
      };

      centralData.consumption.average = {
        specific_consumption: avgSpecificConsumption
      };

      // Add central data to final result array
      result.push(centralData);
    }

    // Return the complete dataset
    return res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Error fetching centrals data:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching centrals data',
      error: error.message
    });
  }
};




const getmaintenancedefectiveequipementalarmsCtrl = async (req, res) => {
  try {
    const periode = req.body;
    const centrals = req.centralids;

    // Validate period
    if (!periode || !periode.start || !periode.end) {
      return res.status(400).json({
        success: false,
        message: 'Invalid period. Please provide start and end dates.'
      });
    }

    // Initialize result object
    const result = [];

    // Process each central
    for (const centralId of centrals) {
      // Get central name
      const centralName = await getCentralNameById(centralId);

      // Create a central object
      const centralData = {
        central_id: centralId,
        central_name: centralName,
        maintenance: { summary: {}, details: [] },
        defective_equipment: { summary: {}, details: [] },
        alarms: { summary: {}, details: [] }
      };

      try {
        // Get maintenance data
        const maintenanceData = await getMaintenanceByPeriodAndCentralId(centralId, periode.start, periode.end);
        centralData.maintenance = {
          summary: {
            total: (maintenanceData.finished?.length || 0) + (maintenanceData.unfinished?.length || 0),
            finished: maintenanceData.finished?.length || 0,
            unfinished: maintenanceData.unfinished?.length || 0
          },
          details: maintenanceData
        };

        // Get defective equipment data
        const defectiveEquipmentData = await getDefectiveEquipmentByPeriodAndCentralId(centralId, periode.start, periode.end);
        centralData.defective_equipment = {
          summary: {
            total: defectiveEquipmentData.summary?.total || 0,
            fixed: defectiveEquipmentData.summary?.fixed || 0,
            pending: defectiveEquipmentData.summary?.pending || 0,
            not_fixed: defectiveEquipmentData.summary?.not_fixed || 0
          },
          details: defectiveEquipmentData
        };

        // Get alarms data
        const alarmsData = await getAlarmsByPeriodAndCentralId(centralId, periode.start, periode.end);
        centralData.alarms = {
          summary: {
            total: alarmsData.summary?.total || 0,
            resolved: alarmsData.summary?.resolved || 0,
            pending: alarmsData.summary?.pending || 0,
            active: alarmsData.summary?.active || 0
          },
          details: alarmsData
        };

      } catch (error) {
        console.error(`Error processing central ${centralId}:`, error);
        // Continue with next central even if one fails
        continue;
      }

      // Add central data to final result array
      result.push(centralData);
    }

    // Return the complete dataset
    return res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Error in controller:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching data',
      error: error.message
    });
  }
};





const getcentralsbygroupementidctrl = async(req,res)=>{
  const centrals = await getCentralsnameandidByGroupementId(req.user.groupement_id);
  res.status(200).json({
    success: true,
    data: centrals
  })
}

module.exports = { getcentralsdatabyperiodeCtrl ,getmaintenancedefectiveequipementalarmsCtrl,getcentralsbygroupementidctrl};

