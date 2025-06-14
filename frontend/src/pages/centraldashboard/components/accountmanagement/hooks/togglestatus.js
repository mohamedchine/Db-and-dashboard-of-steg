import { useState } from 'react';
import axios from '../../../../../api/customizedaxios'; // Make sure this path is correct
import useAuth from '../../../../../context/useAuth';
import { toast } from 'react-toastify';

const useToggleAccountStatus = () => {
  const [loadingB, setLoadingB] = useState(false);
  const { user } = useAuth(); 

  const toggleStatus = async (userId, isActive,setaccounts) => {
    setLoadingB(true);
    

    const endpoint = !isActive
      ? `/chef/activate/${user.central_id}/${userId}`
      : `/chef/desactivateuser/${user.central_id}/${userId}`;

    try {
      const response = await axios.put(endpoint);
      setaccounts(prev =>
        prev.map(acc =>
          acc.id === userId ? { ...acc, is_active: isActive ? 0 : 1 } : acc
        )
      );
      toast(response.data.message);
    } catch (err) {
      console.log(err)
    }
    finally{
        setLoadingB(false);
    }
  };

  return { toggleStatus, loadingB };
};

export default useToggleAccountStatus;