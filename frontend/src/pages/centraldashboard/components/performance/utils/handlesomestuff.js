import { useContext, useState } from "react";
import { TurbinesContext } from "../../../../../context/turbinesContext";

const useHandleStates = () => {
  const { turbines } = useContext(TurbinesContext);

  const [selectedTurbine, setSelectedTurbine] = useState(turbines[0].turbine_id);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleTurbineChange = (event) => {
    setSelectedTurbine(event.target.value);
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  return {
    selectedTurbine,
    selectedDate,
    handleTurbineChange,
    handleDateChange,
  };
};

export default useHandleStates;