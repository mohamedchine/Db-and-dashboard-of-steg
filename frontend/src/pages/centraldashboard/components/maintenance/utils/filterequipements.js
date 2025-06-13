const addTurbineName = (maintenances, turbines) => {
  //go through each maintenance object in the array  
  return maintenances.map(maintenance => {
    //in the turbine array go through each turbine object and return the object that its turbine===maintenance turbine
      const turbine = turbines.find(t => t.turbine_id === maintenance.related_item.turbine_id);
     //replace the old maintenance with the new maintenance with the turbine name
      return {
        ...maintenance,
        turbine_name: turbine.name 
      };
    });
  };
export default addTurbineName ; 