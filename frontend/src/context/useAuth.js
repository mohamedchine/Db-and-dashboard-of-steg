import { useContext } from "react";
import { UserContext } from "./usercontext";

const useAuth = () => {
    const date = new Date();
    const showTime = date.getHours() 
        + ':' + date.getMinutes() 
        + ":" + date.getSeconds();
    console.log("useAuth  is running" ,showTime);
    return   useContext(UserContext);
  
};

export default useAuth;