import React, { useState } from 'react';
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
  Chip
} from '@mui/material';

const Incidents = ({ selectedCentrals }) => {
  const [activeTab, setActiveTab] = useState(0);

  // Alarms data for each turbine by central
  const alarmsData = [
    {
      central: 'KSR',
      turbines: [
        { name: 'TG1', alarms: [] },
        { name: 'TG2', alarms: [] },
      ],
    },
    {
      central: 'FRA',
      turbines: [
        { name: 'TG1', alarms: [] },
        {
          name: 'TG2',
          alarms: [
            {
              id: 1,
              date: '2025-05-05 14:30:45',
              type: 'Critical',
              code: 'ALM-T-003',
              description: 'Excessive temperature in exhaust system',
              status: 'Resolved',
            },
            {
              id: 2,
              date: '2025-05-02 08:15:22',
              type: 'Warning',
              code: 'ALM-T-001',
              description: 'High vibration detected on bearing #2',
              status: 'Resolved',
            },
          ],
        },
      ],
    },
    {
      central: 'BMA',
      turbines: [
        {
          name: 'TG3',
          alarms: [
            {
              id: 3,
              date: '2025-05-04 09:10:05',
              type: 'Critical',
              code: 'ALM-C-004',
              description: 'Compressor surge detected',
              status: 'Resolved',
            },
          ],
        },
        { name: 'TG4', alarms: [] },
        {
          name: 'TG5',
          alarms: [
            {
              id: 4,
              date: '2025-05-08 11:25:40',
              type: 'Warning',
              code: 'ALM-F-002',
              description: 'Fuel system pressure fluctuation',
              status: 'Active',
            },
          ],
        },
      ],
    },
    {
      central: 'THY',
      turbines: [
        { name: 'TG1', alarms: [] },
        {
          name: 'TG2',
          alarms: [
            {
              id: 5,
              date: '2025-05-03 10:22:18',
              type: 'Warning',
              code: 'ALM-P-002',
              description: 'Low oil pressure in lubrication system',
              status: 'Resolved',
            },
          ],
        },
        {
          name: 'TG3',
          alarms: [
            {
              id: 6,
              date: '2025-05-07 16:45:33',
              type: 'Emergency',
              code: 'ALM-E-001',
              description: 'Emergency shutdown triggered - overspeed protection',
              status: 'Resolved',
            },
          ],
        },
      ],
    },
    {
      central: 'RBA',
      turbines: [{ name: 'TG', alarms: [] }],
    },
    {
      central: 'ZAR',
      turbines: [{ name: 'TG', alarms: [] }],
    },
  ];

  // Defective Equipment data for each turbine by central
  const defectiveEquipmentData = [
    {
      central: 'KSR',
      turbines: [
        { name: 'TG1', equipment: [] },
        { name: 'TG2', equipment: [] },
      ],
    },
    {
      central: 'FRA',
      turbines: [
        { name: 'TG1', equipment: [] },
        {
          name: 'TG2',
          equipment: [
            {
              id: 1,
              component: 'Vibration Sensor 96VC-12',
              detected: '2025-05-02',
              severity: 'Medium',
              description: 'Vibration sensor providing inconsistent readings',
              status: 'Repaired',
              impact: 'Potential for missed early warning of bearing issues',
            },
            {
              id: 2,
              component: 'Exhaust Temperature Sensor',
              detected: '2025-05-05',
              severity: 'High',
              description: 'Temperature sensor failure causing false alarms',
              status: 'Repaired',
              impact: 'Risk of unnecessary shutdowns',
            },
          ],
        },
      ],
    },
    {
      central: 'BMA',
      turbines: [
        {
          name: 'TG3',
          equipment: [
            {
              id: 5,
              component: 'Compressor Inlet Guide Vanes',
              detected: '2025-05-04',
              severity: 'High',
              description: 'Guide vanes not positioning correctly',
              status: 'Repaired',
              impact: 'Reduced efficiency and risk of compressor surge',
            },
          ],
        },
        { name: 'TG4', equipment: [] },
        {
          name: 'TG5',
          equipment: [
            {
              id: 6,
              component: 'Fuel Control Valve',
              detected: '2025-05-08',
              severity: 'Medium',
              description: 'Fuel control valve showing erratic behavior',
              status: 'Under Analysis',
              impact: 'Unstable combustion and power output',
            },
          ],
        },
      ],
    },
    {
      central: 'THY',
      turbines: [
        { name: 'TG1', equipment: [] },
        {
          name: 'TG2',
          equipment: [
            {
              id: 3,
              component: 'Oil Pressure Regulator',
              detected: '2025-05-03',
              severity: 'Medium',
              description: 'Oil pressure regulator sticking intermittently',
              status: 'Repaired',
              impact: 'Reduced lubrication efficiency',
            },
          ],
        },
        {
          name: 'TG3',
          equipment: [
            {
              id: 4,
              component: 'Overspeed Protection System',
              detected: '2025-05-07',
              severity: 'Critical',
              description: 'Overspeed protection triggered at normal speed',
              status: 'Under Repair',
              impact: 'Turbine cannot operate until fixed',
            },
          ],
        },
      ],
    },
    {
      central: 'RBA',
      turbines: [{ name: 'TG', equipment: [] }],
    },
    {
      central: 'ZAR',
      turbines: [{ name: 'TG', equipment: [] }],
    },
  ];

  // Maintenance data for each turbine by central
  const maintenanceData = [
    {
      central: 'KSR',
      turbines: [
        { name: 'TG1', maintenance: [] },
        { name: 'TG2', maintenance: [] },
      ],
    },
    {
      central: 'FRA',
      turbines: [
        { name: 'TG1', maintenance: [] },
        {
          name: 'TG2',
          maintenance: [
            {
              id: 1,
              type: 'Corrective',
              description: 'Replace vibration sensor 96VC-12 and calibrate',
              scheduled: '2025-05-04',
              start: '2025-05-04',
              end: '2025-05-04',
              status: 'Completed',
              duration: 2.5,
              team: 'Maintenance Team A',
            },
            {
              id: 2,
              type: 'Corrective',
              description: 'Replace and recalibrate exhaust temperature sensor',
              scheduled: '2025-05-06',
              start: '2025-05-06',
              end: '2025-05-06',
              status: 'Completed',
              duration: 3.25,
              team: 'Maintenance Team B',
            },
            {
              id: 7,
              type: 'Preventive',
              description: 'Annual inspection of hot gas path',
              scheduled: '2025-05-15',
              start: null,
              end: null,
              status: 'Scheduled',
              duration: 24,
              team: 'Specialist Team',
            },
          ],
        },
      ],
    },
    {
      central: 'BMA',
      turbines: [
        {
          name: 'TG3',
          maintenance: [
            {
              id: 5,
              type: 'Corrective',
              description: 'Adjust and realign compressor inlet guide vanes',
              scheduled: '2025-05-07',
              start: '2025-05-07',
              end: '2025-05-07',
              status: 'Completed',
              duration: 5.5,
              team: 'Maintenance Team A',
            },
          ],
        },
        { name: 'TG4', maintenance: [] },
        {
          name: 'TG5',
          maintenance: [
            {
              id: 6,
              type: 'Preventive',
              description: 'Inspect and test fuel control system',
              scheduled: '2025-05-12',
              start: null,
              end: null,
              status: 'Scheduled',
              duration: 4,
              team: 'Maintenance Team B',
            },
          ],
        },
      ],
    },
    {
      central: 'THY',
      turbines: [
        { name: 'TG1', maintenance: [] },
        {
          name: 'TG2',
          maintenance: [
            {
              id: 3,
              type: 'Corrective',
              description: 'Clean and adjust oil pressure regulator',
              scheduled: '2025-05-05',
              start: '2025-05-05',
              end: '2025-05-05',
              status: 'Completed',
              duration: 4,
              team: 'Maintenance Team C',
            },
          ],
        },
        {
          name: 'TG3',
          maintenance: [
            {
              id: 4,
              type: 'Corrective',
              description: 'Overhaul overspeed protection system',
              scheduled: '2025-05-11',
              start: '2025-05-11',
              end: null,
              status: 'In Progress',
              duration: null,
              team: 'Specialist Team',
            },
          ],
        },
      ],
    },
    {
      central: 'RBA',
      turbines: [{ name: 'TG', maintenance: [] }],
    },
    {
      central: 'ZAR',
      turbines: [{ name: 'TG', maintenance: [] }],
    },
  ];

  // Filter data based on selected centrals
  const getFilteredData = (data) => {
    return data.filter((item) => selectedCentrals[item.central.toLowerCase()]);
  };

  const filteredAlarmsData = getFilteredData(alarmsData);
  const filteredDefectiveEquipmentData = getFilteredData(defectiveEquipmentData);
  const filteredMaintenanceData = getFilteredData(maintenanceData);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
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
      default:
        return 'default';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
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

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h2">
          Incidents Management
        </Typography>
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
          {filteredAlarmsData.map((central) => (
            <Card key={central.central} sx={{ mb: 3 }}>
              <CardHeader
                title={`${central.central} Central`}
                sx={{ backgroundColor: 'grey.100' }}
              />
              <CardContent sx={{ p: 0 }}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Turbine</TableCell>
                        <TableCell>Date/Time</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Code</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {central.turbines.map((turbine) =>
                        turbine.alarms.length > 0 ? (
                          turbine.alarms.map((alarm) => (
                            <TableRow key={alarm.id}>
                              <TableCell sx={{ fontWeight: 'bold' }}>{turbine.name}</TableCell>
                              <TableCell>{alarm.date}</TableCell>
                              <TableCell>
                                <Chip
                                  label={alarm.type}
                                  color={getSeverityColor(alarm.type)}
                                  size="small"
                                />
                              </TableCell>
                              <TableCell>{alarm.code}</TableCell>
                              <TableCell>{alarm.description}</TableCell>
                              <TableCell>
                                <Chip
                                  label={alarm.status}
                                  color={getStatusColor(alarm.status)}
                                  size="small"
                                />
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow key={turbine.name}>
                            <TableCell sx={{ fontWeight: 'bold' }}>{turbine.name}</TableCell>
                            <TableCell colSpan={5} sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                              No alarms recorded
                            </TableCell>
                          </TableRow>
                        )
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
          {filteredDefectiveEquipmentData.map((central) => (
            <Card key={central.central} sx={{ mb: 3 }}>
              <CardHeader
                title={`${central.central} Central`}
                sx={{ backgroundColor: 'grey.100' }}
              />
              <CardContent sx={{ p: 0 }}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Turbine</TableCell>
                        <TableCell>Component</TableCell>
                        <TableCell>Detected</TableCell>
                        <TableCell>Severity</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Impact</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {central.turbines.map((turbine) =>
                        turbine.equipment.length > 0 ? (
                          turbine.equipment.map((equipment) => (
                            <TableRow key={equipment.id}>
                              <TableCell sx={{ fontWeight: 'bold' }}>{turbine.name}</TableCell>
                              <TableCell>{equipment.component}</TableCell>
                              <TableCell>{equipment.detected}</TableCell>
                              <TableCell>
                                <Chip
                                  label={equipment.severity}
                                  color={getSeverityColor(equipment.severity)}
                                  size="small"
                                />
                              </TableCell>
                              <TableCell>{equipment.description}</TableCell>
                              <TableCell>
                                <Chip
                                  label={equipment.status}
                                  color={getStatusColor(equipment.status)}
                                  size="small"
                                />
                              </TableCell>
                              <TableCell>{equipment.impact}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow key={turbine.name}>
                            <TableCell sx={{ fontWeight: 'bold' }}>{turbine.name}</TableCell>
                            <TableCell colSpan={6} sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                              No defective equipment reported
                            </TableCell>
                          </TableRow>
                        )
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
          {filteredMaintenanceData.map((central) => (
            <Card key={central.central} sx={{ mb: 3 }}>
              <CardHeader
                title={`${central.central} Central`}
                sx={{ backgroundColor: 'grey.100' }}
              />
              <CardContent sx={{ p: 0 }}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Turbine</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Scheduled</TableCell>
                        <TableCell>Start</TableCell>
                        <TableCell>End</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Duration (h)</TableCell>
                        <TableCell>Team</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {central.turbines.map((turbine) =>
                        turbine.maintenance.length > 0 ? (
                          turbine.maintenance.map((maintenance) => (
                            <TableRow key={maintenance.id}>
                              <TableCell sx={{ fontWeight: 'bold' }}>{turbine.name}</TableCell>
                              <TableCell>
                                <Chip
                                  label={maintenance.type}
                                  color={maintenance.type === 'Corrective' ? 'warning' : 'info'}
                                  size="small"
                                />
                              </TableCell>
                              <TableCell>{maintenance.description}</TableCell>
                              <TableCell>{maintenance.scheduled}</TableCell>
                              <TableCell>{maintenance.start || '-'}</TableCell>
                              <TableCell>{maintenance.end || '-'}</TableCell>
                              <TableCell>
                                <Chip
                                  label={maintenance.status}
                                  color={getStatusColor(maintenance.status)}
                                  size="small"
                                />
                              </TableCell>
                              <TableCell>{maintenance.duration || '-'}</TableCell>
                              <TableCell>{maintenance.team}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow key={turbine.name}>
                            <TableCell sx={{ fontWeight: 'bold' }}>{turbine.name}</TableCell>
                            <TableCell colSpan={8} sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                              No maintenance activities scheduled
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Incidents;

