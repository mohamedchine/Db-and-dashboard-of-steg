import { useState, useCallback } from 'react';
import axs from '../../../../../api/customizedaxios'; 
import { toast } from 'react-toastify';

const useGetPerformance = () => {
    const [loading, setLoading] = useState(false);
    
    const getperformance = useCallback(async (centralid, date, selectedTurbine) => {
        const formattedDate = date.toISOString().split('T')[0];
       
        try {
            setLoading(true);
            const response = await axs.post(`performance/get/${centralid}/${selectedTurbine}`, {date: formattedDate});
            return response.data.performances; 
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error fetching performance data';
            toast.error(errorMessage);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);
    
    return { getperformance, loading };
};

export default useGetPerformance;