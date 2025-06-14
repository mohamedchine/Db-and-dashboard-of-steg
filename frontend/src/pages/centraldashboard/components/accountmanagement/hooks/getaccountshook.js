import { useState } from 'react';
import axs from '../../../../../api/customizedaxios';
import  useAuth from '../../../../../context/useAuth'
const useGetAccounts = ()=>{
    const [loading,setloading]=useState(false);
    const [accounts , setaccounts] = useState([]);
    const {user} = useAuth();
    const getaccounts = async()=>{
        try{
            setloading(true);
        const response = await axs.get(`/chef/getAllcentralUsers/${user.central_id}`);
        
        setaccounts (response.data.accounts) ; 
    }
    catch(e){
        console.log(e);
    }
    finally{
      
            setloading(false);
       
    }
    }
    return {getaccounts,loading,accounts,setaccounts};

}

export default useGetAccounts ; 