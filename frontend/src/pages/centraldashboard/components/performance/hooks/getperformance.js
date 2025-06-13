import { useState } from 'react';
import axios from '../../../../../api/customizedaxios'; 
import { toast } from 'react-toastify';

const useGetPerformance =  () => {
    const [loading,setloading] = useState(false);
    const getperformance = async( centralid , date,selectedTurbine)=>{
    try {
        setloading(true);
        const response = await axios.get(`performance/${centralid}/${selectedTurbine}` , {date});
        return response.data.performances ; 
    } catch (error) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage)
    }
    finally{
        setloading(false)
    }}
    return {getperformance ,loading};
};

export default useGetPerformance;