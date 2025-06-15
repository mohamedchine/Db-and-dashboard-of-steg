import React, { useState, useMemo } from 'react';
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
  Alert
} from '@mui/material';

const Incidents = ({ selectedCentrals, incidentsData, loading }) => {
  const [activeTab, setActiveTab] = useState(0);

  // Filter incidents data based on selected centrals
  const filteredData = useMemo(() => {
    if (!incidentsData || !selectedCentrals) return [];
    
    return incidentsData.filter(central => 
      selectedCentrals.includes(central.central_id)
    );
  }, [incidentsData, selectedCentrals]);

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
      case 'finished':
        return 'success';
      case 'unfinished':
        return 'warning';
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

  // Helper function to get all alarms from different status arrays
  const getAllAlarms = (alarmsData) => {
    const allAlarms = [];
    if (alarmsData.details.resolved) allAlarms.push(...alarmsData.details.resolved);
    if (alarmsData.details.pending) allAlarms.push(...alarmsData.details.pending);
    if (alarmsData.details.active) allAlarms.push(...alarmsData.details.active);
    return allAlarms;
  };

  // Helper function to get all defective equipment from different status arrays
  const getAllDefectiveEquipment = (defectiveData) => {
    const allEquipment = [];
    if (defectiveData.details.fixed) allEquipment.push(...defectiveData.details.fixed);
    if (defectiveData.details.pending) allEquipment.push(...defectiveData.details.pending);
    if (defectiveData.details.not_fixed) allEquipment.push(...defectiveData.details.not_fixed);
    return allEquipment;
  };

  // Helper function to get all maintenance from different status arrays
  const getAllMaintenance = (maintenanceData) => {
    const allMaintenance = [];
    if (maintenanceData.details.finished) allMaintenance.push(...maintenanceData.details.finished);
    if (maintenanceData.details.unfinished) allMaintenance.push(...maintenanceData.details.unfinished);
    return allMaintenance;
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

  if (!incidentsData) {
    return (
      <Box py={4}>
        <Alert severity="info">
          No data loaded. Please select a date range and click "Apply" to load incidents data.
        </Alert>
      </Box>
    );
  }

  if (filteredData.length === 0) {
    return (
      <Box py={4}>
        <Alert severity="warning">
          No incidents data available for the selected centrals and date range.
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
        Incidents Management
      </Typography>

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
          {filteredData.map((central) => {
            const allAlarms = getAllAlarms(central.alarms);
            return (
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
                        {allAlarms.length > 0 ? (
                          allAlarms.map((alarm, index) => (
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
            );
          })}
        </Box>
      )}

      {activeTab === 1 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" component="h3" sx={{ mb: 3 }}>
            Defective Equipment
          </Typography>
          {filteredData.map((central) => {
            const allEquipment = getAllDefectiveEquipment(central.defective_equipment);
            return (
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
                        {allEquipment.length > 0 ? (
                          allEquipment.map((equipment, index) => (
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
            );
          })}
        </Box>
      )}

      {activeTab === 2 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" component="h3" sx={{ mb: 3 }}>
            Maintenance
          </Typography>
          {filteredData.map((central) => {
            const allMaintenance = getAllMaintenance(central.maintenance);
            return (
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
                        {allMaintenance.length > 0 ? (
                          allMaintenance.map((maintenance, index) => (
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
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default Incidents;

