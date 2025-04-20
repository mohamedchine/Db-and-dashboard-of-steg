// components/PublicRoute.js
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context/usercontext';

const PublicRoute = () => {
  const { user } = useContext(UserContext);

  
  if (user) {
    if (user.central_id) return <Navigate to="/central/dashboard" replace />;
    if (user.groupement_id) return <Navigate to="/groupement/dashboard" replace />;
    if (user.direction_id) return <Navigate to="/direction/dashboard" replace />;
  }

 
  return <Outlet />;
};

export default PublicRoute;