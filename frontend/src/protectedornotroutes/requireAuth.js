import useAuth from "../context/useAuth";
import { Navigate, Outlet } from "react-router-dom";
const RequireAuth = ({allowedunittype}) => {
    const date = new Date();
  const showTime = date.getHours() 
      + ':' + date.getMinutes() 
      + ":" + date.getSeconds();
  console.log("requiredauth  is running" ,showTime);
    const {user} = useAuth();
    
    
    if (!user) {
        return <Navigate to="/login"  replace />;
    }
    console.log(user);
    // user is logged in but not authorized
    return allowedunittype.includes(user.unittype) 
        ? <Outlet /> 
        : <Navigate to="/404"  replace />;
}
 
export default RequireAuth;