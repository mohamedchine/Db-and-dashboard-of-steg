import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom"; // Import useLocation
import Wpage from "./pages/welcomepage/welcomepage";
import NotFound from "./pages/notfound/notfound";
import CentralDashboard from "./pages/centraldashboard/centraldashboard";
import GroupementDashboard from "./pages/groupementdashboard/groupementdashboard";
import DirectionDashboard from "./pages/directiondashboard/directiondashboard";
import ProtectedRoutes from "./redirections/protectedRoutes";
import PublicRoute from "./redirections/publicRoutes";
function App() {
  

  return (
    <div className="App">
      <Routes>
    
        <Route path="/welcomepage/*" element={<Wpage />} />
        <Route path="/" element={<Navigate to="/welcomepage" replace />} />
       
        <Route element={<ProtectedRoutes />}>
          <Route path="central/dashboard/*" element={<CentralDashboard />} />
          <Route path="groupement/dashboard/*" element={<GroupementDashboard />} />
          <Route path="direction/dashboard/*" element={<DirectionDashboard />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
