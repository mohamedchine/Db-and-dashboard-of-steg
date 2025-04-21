import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import Wpage from "../pages/welcomepage/welcomepage";

const AuthRedirect = () => {
  const { user } = useAuth();
  
  if (user) {
    switch (user.unittype) {
      case "central":
        return <Navigate to="/central/dashboard" replace />;
      case "groupement":
        return <Navigate to="/groupement/dashboard" replace />;
      case "direction":
        return <Navigate to="/direction/dashboard" replace />;
      default:
        
        return <Navigate to="/404" replace />;
    }
  }
  

  return <Wpage><Outlet /></Wpage>;
};

export default AuthRedirect;