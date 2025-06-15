import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Alert,
  Button,
  Snackbar
} from '@mui/material';
import {
  Refresh as RefreshIcon
} from '@mui/icons-material';
import useFetchIncidentsData from './hooks/useFetchIncidentsData';

const Incidents = ({ selectedCentrals, dateRange }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Use the incidents data fetching hook
  const { incidentsData, loading, error } = useFetchIncidentsData(dateRange, triggerFetch);

  // Auto-fetch data on component mount
  useEffect(() => {
    if (!triggerFetch) {
      setTriggerFetch(true);
    }
  }, [dateRange]);

  // Handle fetch completion
  useEffect(() => {
    if (triggerFetch && !loading) {
      if (error) {
        setSnackbarMessage(`Error: ${error}`);
        setSnackbarSeverity('error');
      } else if (incidentsData) {
        setSnackbarMessage('Incidents data refreshed successfully');
        setSnackbarSeverity('success');
      }
      setSnackbarOpen(true);
      setTriggerFetch(false);
    }
  }, [triggerFetch, loading, error, incidentsData]);

  // Filter incidents data based on selected centrals
  const filteredData = useMemo(() => {
    if (!incidentsData || !selectedCentrals) return [];
    
    return incidentsData.filter(central => 
      selectedCentrals.includes(central.central_id)
    );
  }, [incidentsData, selectedCentrals]);

  const handleRefreshData = () => {
    setTriggerFetch(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'error';
      case 'resolved':
        return 'success';
      case 'completed':
        return 'success';
      case 'in progress':
        return 'warning';
      case 'scheduled':
        return 'info';
      case 'repaired':
        return 'success';
      case 'under repair':
        return 'warning';
      case 'under analysis':
        return 'warning';
      case 'fixed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'not fixed':
        return 'error';
      default:
        return 'default';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return 'error';
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      case 'emergency':
        return 'error';
      case 'warning':
        return 'warning';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" py={8}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Loading incidents data...
        </Typography>
      </Box>
    );
  }

  if (!incidentsData || filteredData.length === 0) {
    return (
      <Box py={4}>
        <Alert severity="info">
          No incidents data available. Please click "Refresh Data" to load the latest information.
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h2">
          Incidents Management
        </Typography>
        
        {/* Refresh Button */}
        <Button
          variant="contained"
          startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <RefreshIcon />}
          onClick={handleRefreshData}
          disabled={loading}
          sx={{ 
            backgroundColor: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.dark'
            },
            '&:disabled': {
              backgroundColor: 'grey.300'
            }
          }}
        >
          {loading ? 'Loading...' : 'Refresh Data'}
        </Button>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="incidents tabs">
          <Tab label="Alarms" />
          <Tab label="Defective Equipment" />
          <Tab label="Maintenance" />
        </Tabs>
      </Box>

      {activeTab === 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" component="h3" sx={{ mb: 3 }}>
            Alarms
          </Typography>
          {filteredData.map((central) => (
            <Card key={central.central_id} sx={{ mb: 3 }}>
              <CardHeader
                title={`${central.central_name} Central - ${central.alarms.summary.total} Total Alarms`}
                sx={{ backgroundColor: 'grey.100' }}
              />
              <CardContent sx={{ p: 0 }}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Turbine</TableCell>
                        <TableCell>Alarm Code</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Happened At</TableCell>
                        <TableCell>Resolved At</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {central.alarms.details && central.alarms.details.length > 0 ? (
                        central.alarms.details.map((alarm, index) => (
                          <TableRow key={`${central.central_id}-alarm-${index}`}>
                            <TableCell sx={{ fontWeight: 'bold' }}>{alarm.turbine_name || 'N/A'}</TableCell>
                            <TableCell>{alarm.alarm_code || 'N/A'}</TableCell>
                            <TableCell>{alarm.description || 'No description'}</TableCell>
                            <TableCell>
                              <Chip
                                label={alarm.status || 'Unknown'}
                                color={getStatusColor(alarm.status)}
                                size="small"
                              />
                            </TableCell>
                            <TableCell>{alarm.happened_at || 'N/A'}</TableCell>
                            <TableCell>{alarm.resolved_at || 'N/A'}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} sx={{ fontStyle: 'italic', color: 'text.secondary', textAlign: 'center' }}>
                            No alarms recorded for this period
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {activeTab === 1 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" component="h3" sx={{ mb: 3 }}>
            Defective Equipment
          </Typography>
          {filteredData.map((central) => (
            <Card key={central.central_id} sx={{ mb: 3 }}>
              <CardHeader
                title={`${central.central_name} Central - ${central.defective_equipment.summary.total} Total Issues`}
                sx={{ backgroundColor: 'grey.100' }}
              />
              <CardContent sx={{ p: 0 }}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Turbine</TableCell>
                        <TableCell>KKS</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Reported At</TableCell>
                        <TableCell>Fixed At</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {central.defective_equipment.details && central.defective_equipment.details.length > 0 ? (
                        central.defective_equipment.details.map((equipment, index) => (
                          <TableRow key={`${central.central_id}-equipment-${index}`}>
                            <TableCell sx={{ fontWeight: 'bold' }}>{equipment.turbine_name || 'N/A'}</TableCell>
                            <TableCell>{equipment.kks || 'N/A'}</TableCell>
                            <TableCell>{equipment.description || 'No description'}</TableCell>
                            <TableCell>
                              <Chip
                                label={equipment.status || 'Unknown'}
                                color={getStatusColor(equipment.status)}
                                size="small"
                              />
                            </TableCell>
                            <TableCell>{equipment.reported_at || 'N/A'}</TableCell>
                            <TableCell>{equipment.fixed_at || 'N/A'}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} sx={{ fontStyle: 'italic', color: 'text.secondary', textAlign: 'center' }}>
                            No defective equipment recorded for this period
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {activeTab === 2 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" component="h3" sx={{ mb: 3 }}>
            Maintenance
          </Typography>
          {filteredData.map((central) => (
            <Card key={central.central_id} sx={{ mb: 3 }}>
              <CardHeader
                title={`${central.central_name} Central - ${central.maintenance.summary.total} Total Maintenance Tasks`}
                sx={{ backgroundColor: 'grey.100' }}
              />
              <CardContent sx={{ p: 0 }}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Turbine</TableCell>
                        <TableCell>KKS</TableCell>
                        <TableCell>OT Number</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Start</TableCell>
                        <TableCell>End</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {central.maintenance.details && central.maintenance.details.length > 0 ? (
                        central.maintenance.details.map((maintenance, index) => (
                          <TableRow key={`${central.central_id}-maintenance-${index}`}>
                            <TableCell sx={{ fontWeight: 'bold' }}>{maintenance.turbine_name || 'N/A'}</TableCell>
                            <TableCell>{maintenance.kks || 'N/A'}</TableCell>
                            <TableCell>{maintenance.ot_number || 'N/A'}</TableCell>
                            <TableCell>{maintenance.description || 'No description'}</TableCell>
                            <TableCell>
                              <Chip
                                label={maintenance.type || 'Unknown'}
                                color={maintenance.type === 'Systematic' ? 'info' : 'warning'}
                                size="small"
                              />
                            </TableCell>
                            <TableCell>{maintenance.start || 'N/A'}</TableCell>
                            <TableCell>{maintenance.end || 'N/A'}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} sx={{ fontStyle: 'italic', color: 'text.secondary', textAlign: 'center' }}>
                            No maintenance activities recorded for this period
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Incidents;

