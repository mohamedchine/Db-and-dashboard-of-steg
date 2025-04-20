import { useContext } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { UserContext } from "../context/usercontext";

const ProtectedRoutes = () => {
  const location = useLocation();
  const { user } = useContext(UserContext);

 // this checks if we dont have a user at first 
  if (!user) {
    return <Navigate to="/welcomepage/login"  replace />;
  }

  //if we do have a user 
  const isCentralUser = user?.central_id;
  const isGroupementUser = user?.groupement_id;
  const isDirectionUser = user?.direction_id;


  const isInCentralDashboard = location.pathname.startsWith("/central/dashboard");
  const isInGroupementDashboard = location.pathname.startsWith("/groupement/dashboard");
  const isInDirectionDashboard = location.pathname.startsWith("/direction/dashboard");

  //and the user role is not what he is trying to access then redirect him
  if (isCentralUser && !isInCentralDashboard) {
    return <Navigate to="/central/dashboard" replace />;
  }
  
  if (isGroupementUser && !isInGroupementDashboard) {
    return <Navigate to="/groupement/dashboard" replace />;
  }

  if (isDirectionUser && !isInDirectionDashboard) {
    return <Navigate to="/direction/dashboard" replace />;
  }
//if user role is what he is trying to access then let him access
  return <Outlet />;
};

export default ProtectedRoutes;