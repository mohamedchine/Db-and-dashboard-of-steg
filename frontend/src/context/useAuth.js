import { useContext } from "react";
import { UserContext } from "./usercontext";

const useAuth = () => {
   
    return   useContext(UserContext);
  
};

export default useAuth;