import React, { useState, useContext, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Toolbar,
  Container,
  FormGroup,
  FormControlLabel,
  Checkbox,
  CircularProgress
} from '@mui/material';
import { ScentralsContext } from '../../context/supervisedcentrals';
import useFetchCentrals from './hooks/fetchcentrals';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Incidents from './Incidents';
import Performance from './Performance';

const drawerWidth = 240;

const GroupementDashboard = () => {
  const { centrals } = useContext(ScentralsContext);
  const { loading } = useFetchCentrals();

  const [selectedCentrals, setSelectedCentrals] = useState([]);
  const [dateRange, setDateRange] = useState({
    from: '2025-05-01',
    to: '2025-05-31',
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  // Initialize selectedCentrals as an array of central_ids
  useEffect(() => {
    if (centrals && centrals.length > 0) {
      const initialSelection = centrals.map(central => central.central_id);
      setSelectedCentrals(initialSelection);
    }
  }, [centrals]);

  const handleCentralChange = (centralId, checked) => {
    if (checked) {
      setSelectedCentrals((prev) => [...prev, centralId]);
    } else {
      setSelectedCentrals((prev) => prev.filter(id => id !== centralId));
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Navbar */}
      <Navbar 
        handleDrawerToggle={handleDrawerToggle}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="navigation"
      >
        <Sidebar 
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        
        <Container maxWidth="xl">
          {/* Centrals Filter */}
          <Card sx={{ mb: 3 }}>
            <CardHeader title="Central Filters" />
            <CardContent>
              <FormGroup row>
                {centrals.map((central) => (
                  <FormControlLabel
                    key={central.central_id}
                    control={
                      <Checkbox
                        checked={selectedCentrals.includes(central.central_id)}
                        onChange={(e) => handleCentralChange(central.central_id, e.target.checked)}
                      />
                    }
                    label={central.central_name}
                  />
                ))}
              </FormGroup>
            </CardContent>
          </Card>

          {/* Routes for different sections */}
          <Routes>
            {/* Default route redirects to performance */}
            <Route path="/" element={<Navigate to="/groupement/dashboard/performance" replace />} />
            <Route 
              path="/performance" 
              element={
                <Performance 
                  selectedCentrals={selectedCentrals} 
                  dateRange={dateRange}
                />
              } 
            />
            <Route 
              path="/incidents" 
              element={
                <Incidents 
                  selectedCentrals={selectedCentrals}
                  dateRange={dateRange}
                />
              } 
            />
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/groupement/dashboard/performance" replace />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
};

export default GroupementDashboard;

