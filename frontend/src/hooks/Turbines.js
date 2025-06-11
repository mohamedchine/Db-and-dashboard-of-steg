
import { useContext, useEffect } from "react";
import { TurbinesContext } from "../context/turbinesContext";
import axs from "../api/customizedaxios";
import useAuth from "../context/useAuth";

const useGetTurbines = (setLoading) => {
  const { user } = useAuth();
  const { setturbines } = useContext(TurbinesContext);

  useEffect(() => {
    const fetchTurbines = async () => {
      setLoading(true);
      try {
        const response = await axs.get(`/turbines/${user.central_id}`);
        setturbines(response.data.turbines);
      } catch (error) {
        console.error("Failed to fetch turbines:", error);
      } finally {
        
        setLoading(false);
      }
    };
      fetchTurbines();
    
  }, []);
};

export default useGetTurbines;
