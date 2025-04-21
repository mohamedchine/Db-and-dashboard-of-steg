import useAuth from "../context/useAuth";
import { Navigate, Outlet } from "react-router-dom";
const RequireAuth = ({allowedunittype}) => {
    const {user} = useAuth();
    
    
    if (!user) {
        
        return <Navigate to="/login"  replace />;
    }

    // user is logged in but not authorized
    return allowedunittype.includes(user.unittype) 
        ? <Outlet /> 
        : <Navigate to="/404"  replace />;
}
 
export default RequireAuth;