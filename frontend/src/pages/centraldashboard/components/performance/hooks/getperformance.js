import axios from '../../../../../api/customizedaxios'; 
import { toast } from 'react-toastify';

const useGetPerformance =  () => {
    const getperformance = async( centralid , date)=>{
    try {
        const response = await axios.get(`performance/${centralid}/` , {date});
        return response.data.performances ; 
    } catch (error) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage)
    }}
    return {getperformance};
};

export default useGetPerformance;