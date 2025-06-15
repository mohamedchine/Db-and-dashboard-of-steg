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
  CircularProgress,
  TextField,
  Button,
  Typography
} from '@mui/material';
import { ScentralsContext } from '../../context/supervisedcentrals';
import useFetchCentrals from './hooks/fetchcentrals';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Incidents from './Incidents';
import Performance from './Performance';
import axs from '../../api/customizedaxios';

const drawerWidth = 240;

const GroupementDashboard = () => {
  const { centrals } = useContext(ScentralsContext);
  const { loading } = useFetchCentrals();

  const [selectedCentrals, setSelectedCentrals] = useState([]);
  const [dateRange, setDateRange] = useState({
    from: '',
    to: '',
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Data states
  const [performanceData, setPerformanceData] = useState(null);
  const [incidentsData, setIncidentsData] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

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

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  const handleApplyData = async () => {
    if (!dateRange.from || !dateRange.to) {
      setFetchError('Please select both start and end dates');
      return;
    }

    if (new Date(dateRange.from) > new Date(dateRange.to)) {
      setFetchError('Start date cannot be after end date');
      return;
    }

    setFetchLoading(true);
    setFetchError(null);

    try {
      // Fetch performance data
      const performanceResponse = await axs.post('/groupement/centralsdata/byperiode', {
        start: dateRange.from,
        end: dateRange.to
      });

      // Fetch incidents data
      const incidentsResponse = await axs.post('/groupement/defeq-alarms-maintenance/byperiode', {
        start: dateRange.from,
        end: dateRange.to
      });

      if (performanceResponse.data.success) {
        setPerformanceData(performanceResponse.data.data);
      }

      if (incidentsResponse.data.success) {
        setIncidentsData(incidentsResponse.data.data);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      setFetchError('Failed to fetch data. Please try again.');
    } finally {
      setFetchLoading(false);
    }
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
      <Navbar handleDrawerToggle={handleDrawerToggle} />

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
          {/* Date Range and Apply Section */}
          <Card sx={{ mb: 3 }}>
            <CardHeader title="Data Controls" />
            <CardContent>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                <TextField
                  label="Start Date"
                  type="date"
                  value={dateRange.from}
                  onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                  InputLabelProps={{ shrink: true }}
                  sx={{ minWidth: 150 }}
                />
                
                <TextField
                  label="End Date"
                  type="date"
                  value={dateRange.to}
                  onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                  InputLabelProps={{ shrink: true }}
                  sx={{ minWidth: 150 }}
                />

                <Button
                  variant="contained"
                  onClick={handleApplyData}
                  disabled={fetchLoading}
                  sx={{ minWidth: 120 }}
                >
                  {fetchLoading ? <CircularProgress size={20} color="inherit" /> : 'Apply'}
                </Button>

                {dateRange.from && dateRange.to && (
                  <Typography variant="body2" color="text.secondary">
                    Period: {formatDateForDisplay(dateRange.from)} - {formatDateForDisplay(dateRange.to)}
                  </Typography>
                )}
              </Box>

              {fetchError && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {fetchError}
                </Typography>
              )}
            </CardContent>
          </Card>

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
                  performanceData={performanceData}
                  loading={fetchLoading}
                />
              } 
            />
            <Route 
              path="/incidents" 
              element={
                <Incidents 
                  selectedCentrals={selectedCentrals}
                  incidentsData={incidentsData}
                  loading={fetchLoading}
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

