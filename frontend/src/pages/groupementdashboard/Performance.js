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
  IconButton,
  Popover
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  Info as InfoIcon
} from '@mui/icons-material';

const Performance = ({ selectedCentrals }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  // Production data for each turbine by central
  const productionData = [
    {
      central: 'KSR',
      turbines: [
        { name: 'TG1', production: 0, auxiliaries: 0, net: 0 },
        { name: 'TG2', production: 0, auxiliaries: 0, net: 0 },
      ],
    },
    {
      central: 'FRA',
      turbines: [
        { name: 'TG1', production: 0, auxiliaries: 0, net: 0 },
        { name: 'TG2', production: 65810, auxiliaries: 1576, net: 64234 },
      ],
    },
    {
      central: 'BMA',
      turbines: [
        { name: 'TG3', production: 5539, auxiliaries: 650, net: 4889 },
        { name: 'TG4', production: 2460, auxiliaries: 500, net: 1960 },
        { name: 'TG5', production: 2048, auxiliaries: 290, net: 1758 },
      ],
    },
    {
      central: 'THY',
      turbines: [
        { name: 'TG1', production: 6323, auxiliaries: 1686, net: 4637 },
        { name: 'TG2', production: 2790, auxiliaries: 859, net: 1931 },
        { name: 'TG3', production: 1239, auxiliaries: 278, net: 961 },
      ],
    },
    {
      central: 'RBA',
      turbines: [{ name: 'TG', production: 0, auxiliaries: 0, net: 0 }],
    },
    {
      central: 'ZAR',
      turbines: [{ name: 'TG', production: 0, auxiliaries: 0, net: 0 }],
    },
  ];

  // Availability data for each turbine by central
  const availabilityData = [
    {
      central: 'KSR',
      turbines: [
        { name: 'TG1', availability: 0, hours: 0, rate: '0.00%' },
        { name: 'TG2', availability: 744, hours: 0, rate: '100.00%' },
      ],
    },
    {
      central: 'FRA',
      turbines: [
        { name: 'TG1', availability: 0, hours: 744, rate: '0.00%' },
        { name: 'TG2', availability: 744, hours: 336.12, rate: '100.00%' },
      ],
    },
    {
      central: 'BMA',
      turbines: [
        { name: 'TG3', availability: 741.15, hours: 26.12, rate: '99.63%' },
        { name: 'TG4', availability: 743.28, hours: 11.42, rate: '99.93%' },
        { name: 'TG5', availability: 744, hours: 28.42, rate: '100.00%' },
      ],
    },
    {
      central: 'THY',
      turbines: [
        { name: 'TG1', availability: 709.3, hours: 29.24, rate: '95.36%' },
        { name: 'TG2', availability: 742.3, hours: 4.18, rate: '99.80%' },
        { name: 'TG3', availability: 742.3, hours: 72.42, rate: '99.80%' },
      ],
    },
    {
      central: 'RBA',
      turbines: [{ name: 'TG', availability: 744, hours: 0, rate: '100.00%' }],
    },
    {
      central: 'ZAR',
      turbines: [{ name: 'TG', availability: 744, hours: 0, rate: '100.00%' }],
    },
  ];

  // Consumption data for each turbine by central
  const consumptionData = [
    {
      central: 'KSR',
      turbines: [
        { name: 'TG1', consumption: 0, specific: 0 },
        { name: 'TG2', consumption: 0, specific: 0 },
      ],
    },
    {
      central: 'FRA',
      turbines: [
        { name: 'TG1', consumption: 0, specific: 0 },
        { name: 'TG2', consumption: 13790, specific: 0.215 },
      ],
    },
    {
      central: 'BMA',
      turbines: [
        { name: 'TG3', consumption: 5474, specific: 1.12 },
        { name: 'TG4', consumption: 2410, specific: 1.23 },
        { name: 'TG5', consumption: 2019, specific: 1.149 },
      ],
    },
    {
      central: 'THY',
      turbines: [
        { name: 'TG1', consumption: 6306, specific: 1.36 },
        { name: 'TG2', consumption: 2781, specific: 1.44 },
        { name: 'TG3', consumption: 1236, specific: 1.286 },
      ],
    },
    {
      central: 'RBA',
      turbines: [{ name: 'TG', consumption: 0, specific: 0 }],
    },
    {
      central: 'ZAR',
      turbines: [{ name: 'TG', consumption: 0, specific: 0 }],
    },
  ];

  // Filter data based on selected centrals
  const getFilteredData = (data) => {
    return data.filter((item) => selectedCentrals[item.central.toLowerCase()]);
  };

  const filteredProductionData = getFilteredData(productionData);
  const filteredAvailabilityData = getFilteredData(availabilityData);
  const filteredConsumptionData = getFilteredData(consumptionData);

  // Prepare chart data functions
  const prepareProductionChartData = () => {
    return filteredProductionData.map((central) => ({
      name: central.central,
      gross: central.turbines.reduce((sum, t) => sum + t.production, 0),
      auxiliaries: central.turbines.reduce((sum, t) => sum + t.auxiliaries, 0),
      net: central.turbines.reduce((sum, t) => sum + t.net, 0),
    }));
  };

  const prepareAvailabilityChartData = () => {
    return filteredAvailabilityData.map((central) => {
      const avgRate =
        central.turbines.reduce((sum, t) => sum + parseFloat(t.rate.replace('%', '')), 0) /
        central.turbines.length;
      return {
        name: central.central,
        rate: avgRate,
        hours: central.turbines.reduce((sum, t) => sum + t.hours, 0) / central.turbines.length,
      };
    });
  };

  const prepareConsumptionChartData = () => {
    return filteredConsumptionData.map((central) => {
      const activeTurbines = central.turbines.filter((t) => t.specific > 0);
      const avgSpecific =
        activeTurbines.length > 0 ? activeTurbines.reduce((sum, t) => sum + t.specific, 0) / activeTurbines.length : 0;

      return {
        name: central.central,
        consumption: central.turbines.reduce((sum, t) => sum + t.consumption, 0),
        specific: avgSpecific,
      };
    });
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleInfoClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleInfoClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const getTabContent = () => {
    switch (activeTab) {
      case 0: // Production
        return (
          <Box sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" component="h3">
                Production Data
              </Typography>
              <IconButton onClick={handleInfoClick}>
                <InfoIcon />
              </IconButton>
              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleInfoClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <Box sx={{ p: 2, maxWidth: 320 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Production Calculations:
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Gross Production (kWh)</strong> = Total electricity generated by the turbine
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Auxiliaries Consumption (kWh)</strong> = Electricity consumed by the plant's own equipment
                  </Typography>
                  <Typography variant="body2">
                    <strong>Net Production (kWh)</strong> = Gross Production - Auxiliaries Consumption
                  </Typography>
                </Box>
              </Popover>
            </Box>

            {/* Production Chart */}
            <Card sx={{ mb: 3 }}>
              <CardHeader
                title="Production by Central"
                sx={{ backgroundColor: 'grey.100' }}
              />
              <CardContent>
                <Box sx={{ height: 320 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={prepareProductionChartData()} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => value.toLocaleString()} />
                      <Legend />
                      <Bar dataKey="gross" name="Gross Production" fill="#8884d8" />
                      <Bar dataKey="auxiliaries" name="Auxiliaries" fill="#82ca9d" />
                      <Bar dataKey="net" name="Net Production" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>

            {/* Production Tables */}
            {filteredProductionData.map((central) => (
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
                          <TableCell align="right">Gross Production (kWh)</TableCell>
                          <TableCell align="right">Auxiliaries (kWh)</TableCell>
                          <TableCell align="right">Net Production (kWh)</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {central.turbines.map((turbine) => (
                          <TableRow key={`${central.central}-${turbine.name}`}>
                            <TableCell sx={{ fontWeight: 'bold' }}>{turbine.name}</TableCell>
                            <TableCell align="right">{turbine.production.toLocaleString()}</TableCell>
                            <TableCell align="right">{turbine.auxiliaries.toLocaleString()}</TableCell>
                            <TableCell align="right">{turbine.net.toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow sx={{ backgroundColor: 'grey.50' }}>
                          <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                            {central.turbines.reduce((sum, t) => sum + t.production, 0).toLocaleString()}
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                            {central.turbines.reduce((sum, t) => sum + t.auxiliaries, 0).toLocaleString()}
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                            {central.turbines.reduce((sum, t) => sum + t.net, 0).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            ))}
          </Box>
        );

      case 1: // Availability
        return (
          <Box sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" component="h3">
                Availability Data
              </Typography>
              <IconButton onClick={handleInfoClick}>
                <InfoIcon />
              </IconButton>
              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleInfoClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <Box sx={{ p: 2, maxWidth: 320 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Availability Calculations:
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Available Hours</strong> = Total hours in period - Unavailable hours
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Operating Hours</strong> = Hours when the turbine is actually running
                  </Typography>
                  <Typography variant="body2">
                    <strong>Availability Rate (%)</strong> = (Available Hours ÷ Total hours in period) × 100
                  </Typography>
                </Box>
              </Popover>
            </Box>

            {/* Availability Chart */}
            <Card sx={{ mb: 3 }}>
              <CardHeader
                title="Availability Rate by Central"
                sx={{ backgroundColor: 'grey.100' }}
              />
              <CardContent>
                <Box sx={{ height: 320 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={prepareAvailabilityChartData()} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[90, 100]} />
                      <Tooltip formatter={(value) => value.toFixed(2) + "%"} />
                      <Legend />
                      <Bar dataKey="rate" name="Availability Rate (%)" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>

            {/* Availability Tables */}
            {filteredAvailabilityData.map((central) => (
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
                          <TableCell align="right">Available Hours</TableCell>
                          <TableCell align="right">Operating Hours</TableCell>
                          <TableCell align="right">Availability Rate</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {central.turbines.map((turbine) => (
                          <TableRow key={`${central.central}-${turbine.name}`}>
                            <TableCell sx={{ fontWeight: 'bold' }}>{turbine.name}</TableCell>
                            <TableCell align="right">{turbine.availability.toLocaleString()}</TableCell>
                            <TableCell align="right">{turbine.hours.toLocaleString()}</TableCell>
                            <TableCell align="right">{turbine.rate}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow sx={{ backgroundColor: 'grey.50' }}>
                          <TableCell sx={{ fontWeight: 'bold' }}>Average</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                            {(
                              central.turbines.reduce((sum, t) => sum + t.availability, 0) / central.turbines.length
                            ).toFixed(2)}
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                            {(central.turbines.reduce((sum, t) => sum + t.hours, 0) / central.turbines.length).toFixed(2)}
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                            {(
                              central.turbines.reduce((sum, t) => sum + parseFloat(t.rate.replace('%', '')), 0) /
                              central.turbines.length
                            ).toFixed(2)}
                            %
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            ))}
          </Box>
        );

      case 2: // Consumption
        return (
          <Box sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" component="h3">
                Consumption Data
              </Typography>
              <IconButton onClick={handleInfoClick}>
                <InfoIcon />
              </IconButton>
              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleInfoClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <Box sx={{ p: 2, maxWidth: 320 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Consumption Calculations:
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Fuel Consumption</strong> = Total amount of fuel used (Nm³ for gas or kg for liquid fuel)
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Specific Consumption (mth/kWh)</strong> = Fuel Consumption ÷ Net Production
                  </Typography>
                  <Typography variant="body2">
                    Lower specific consumption indicates better efficiency
                  </Typography>
                </Box>
              </Popover>
            </Box>

            {/* Consumption Chart */}
            <Card sx={{ mb: 3 }}>
              <CardHeader
                title="Specific Consumption by Central"
                sx={{ backgroundColor: 'grey.100' }}
              />
              <CardContent>
                <Box sx={{ height: 320 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={prepareConsumptionChartData()} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => value.toFixed(3)} />
                      <Legend />
                      <Bar dataKey="specific" name="Specific Consumption (mth/kWh)" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>

            {/* Consumption Tables */}
            {filteredConsumptionData.map((central) => (
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
                          <TableCell align="right">Fuel Consumption</TableCell>
                          <TableCell align="right">Specific Consumption (mth/kWh)</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {central.turbines.map((turbine) => (
                          <TableRow key={`${central.central}-${turbine.name}`}>
                            <TableCell sx={{ fontWeight: 'bold' }}>{turbine.name}</TableCell>
                            <TableCell align="right">{turbine.consumption.toLocaleString()}</TableCell>
                            <TableCell align="right">{turbine.specific.toFixed(3)}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow sx={{ backgroundColor: 'grey.50' }}>
                          <TableCell sx={{ fontWeight: 'bold' }}>Total/Average</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                            {central.turbines.reduce((sum, t) => sum + t.consumption, 0).toLocaleString()}
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                            {(() => {
                              const activeTurbines = central.turbines.filter((t) => t.specific > 0);
                              return activeTurbines.length > 0
                                ? (activeTurbines.reduce((sum, t) => sum + t.specific, 0) / activeTurbines.length).toFixed(3)
                                : "0.000";
                            })()}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            ))}
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h2">
          Turbine Performance
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="performance tabs">
          <Tab label="Production" />
          <Tab label="Availability" />
          <Tab label="Consumption" />
        </Tabs>
      </Box>

      {getTabContent()}
    </Box>
  );
};

export default Performance;

