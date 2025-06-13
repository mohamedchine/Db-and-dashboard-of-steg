import { Routes, Route } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

import Sidebbar from "./components/sidebar/sidebar";
import Alarms from "./components/alarms/alarms";
import ActivityLog from "./components/activitylog/activitylog";
import AccountManagement from "./components/accountmanagement/accountmanagement";
import DefectiveEquipement from "./components/defectiveequipement/defectiveequipement";
import Maintenance from "./components/maintenance/maintenance";
import Performance from "./components/performance/performance";
import NotFound from "../notfound/notfound";
import IsChiefProtectedRoute from "../../utils/ischiefprotectedroute";
import "./centraldashboard.css";
import {  useState } from "react";
import useGetTurbines from "../../hooks/Turbines";


const CentralDashboard = () => {
  const [loading, setLoading] = useState(true);
  //before loading the page we gotta first fetch the turbines
  useGetTurbines(setLoading);
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebbar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: '#f9fafb',
            overflow: 'auto'
          }}
        >
          <Routes>
            <Route path="/" element={<Alarms />} />
            <Route path="performance" element={<Performance />} />
            <Route path="alarms/*" element={<Alarms />} />
            <Route path="activity-log" element={<ActivityLog />} />
            <Route path="defective-equipement/*" element={<DefectiveEquipement />} />
            <Route path="maintenance/*" element={<Maintenance />} />
            <Route
              path="account-management"
              element={
                <IsChiefProtectedRoute>
                  <AccountManagement />
                </IsChiefProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      
    </Box>
  );
  
};

export default CentralDashboard;
