import useAuth from "../context/useAuth";
import { Navigate, Outlet ,useLocation} from "react-router-dom";
const RequireAuth = ({allowedunittype}) => {
    const {user} = useAuth();
    const location = useLocation(); //the current location that the user asking for //dashboard what
    // console.log(location);
    if (!user) {
        // User is not logged in
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // User is logged in but not authorized
    return allowedunittype.includes(user.unittype) 
        ? <Outlet /> 
        : <Navigate to="/404" state={{ from: location }} replace />;
}
 
export default RequireAuth;