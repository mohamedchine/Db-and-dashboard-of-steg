import axios from '../../../../../api/customizedaxios'; 
import { toast } from 'react-toastify';

const useAddPerformance =  () => {
    const addperformance = async(performance, centralid, turbineid)=>{
    try {
        const response = await axios.post(`performance/${centralid}/${turbineid}`, performance);
        toast.success(response.data.message );
      
    } catch (error) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage);  
    }}
    return {addperformance};
};

export default useAddPerformance;