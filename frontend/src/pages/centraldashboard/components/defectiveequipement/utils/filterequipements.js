const addTurbineName = (alarms, turbines) => {
    return alarms.map(alarm => {
      const turbine = turbines.find(t => t.turbine_id === alarm.turbine_id);
      return {
        ...alarm,
        turbine_name: turbine?.name || 'Unknown Turbine'
      };
    });
  };
export default addTurbineName ; 