import useAuth from "../context/useAuth";
import { useNavigate } from "react-router-dom";
//we used a hook to be able to consume the user (normal functions cant)
import axs from "../api/customizedaxios";
const useLogout = () => {
    
    const { setuser } = useAuth();
    const navigate = useNavigate();
  
    const logout = async () => {
        
      await axs.post('/auth/logout');
      setuser(null);
      navigate('/login',{replace:true});
    };
  
    return logout;
  };
export default useLogout ; 