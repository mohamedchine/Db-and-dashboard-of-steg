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
  IconButton,
  Popover,
  CircularProgress,
  Alert
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

const Performance = ({ selectedCentrals, performanceData, loading }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  // Filter performance data based on selected centrals
  const filteredData = useMemo(() => {
    if (!performanceData || !selectedCentrals) return [];
    
    return performanceData.filter(central => 
      selectedCentrals.includes(central.central_id)
    );
  }, [performanceData, selectedCentrals]);

  // Prepare chart data functions
  const prepareProductionChartData = () => {
    return filteredData.map((central) => ({
      name: central.central_name,
      gross: central.production.total.gross_production,
      auxiliaries: central.production.total.auxiliaries_consumption,
      net: central.production.total.net_production,
    }));
  };

  const prepareAvailabilityChartData = () => {
    return filteredData.map((central) => ({
      name: central.central_name,
      rate: parseFloat(central.availability.average.availability_rate),
      hours: parseFloat(central.availability.average.operating_hours),
    }));
  };

  const prepareConsumptionChartData = () => {
    return filteredData.map((central) => ({
      name: central.central_name,
      consumption: central.consumption.total.fuel_consumption,
      specific: parseFloat(central.consumption.average.specific_consumption),
    }));
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
            {filteredData.map((central) => (
              <Card key={central.central_id} sx={{ mb: 3 }}>
                <CardHeader
                  title={`${central.central_name} Central`}
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
                        {Object.entries(central.production.turbines).map(([turbineName, data]) => (
                          <TableRow key={`${central.central_id}-${turbineName}`}>
                            <TableCell sx={{ fontWeight: 'bold' }}>{turbineName}</TableCell>
                            <TableCell align="right">{Number(data.gross_production).toLocaleString()}</TableCell>
                            <TableCell align="right">{Number(data.auxiliaries_consumption).toLocaleString()}</TableCell>
                            <TableCell align="right">{Number(data.net_production).toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow sx={{ backgroundColor: 'grey.50' }}>
                          <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                            {Number(central.production.total.gross_production).toLocaleString()}
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                            {Number(central.production.total.auxiliaries_consumption).toLocaleString()}
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                            {Number(central.production.total.net_production).toLocaleString()}
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
                      <YAxis domain={[0, 100]} />
                      <Tooltip formatter={(value) => value.toFixed(2) + "%"} />
                      <Legend />
                      <Bar dataKey="rate" name="Availability Rate (%)" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>

            {/* Availability Tables */}
            {filteredData.map((central) => (
              <Card key={central.central_id} sx={{ mb: 3 }}>
                <CardHeader
                  title={`${central.central_name} Central`}
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
                        {Object.entries(central.availability.turbines).map(([turbineName, data]) => (
                          <TableRow key={`${central.central_id}-${turbineName}`}>
                            <TableCell sx={{ fontWeight: 'bold' }}>{turbineName}</TableCell>
                            <TableCell align="right">{Number(data.available_hours).toLocaleString()}</TableCell>
                            <TableCell align="right">{Number(data.operating_hours).toLocaleString()}</TableCell>
                            <TableCell align="right">{data.availability_rate}%</TableCell>
                          </TableRow>
                        ))}
                        <TableRow sx={{ backgroundColor: 'grey.50' }}>
                          <TableCell sx={{ fontWeight: 'bold' }}>Average</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                            {Number(central.availability.average.available_hours).toFixed(2)}
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                            {Number(central.availability.average.operating_hours).toFixed(2)}
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                            {central.availability.average.availability_rate}%
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
                Fuel Consumption Data
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
                    <strong>Fuel Consumption</strong> = Total fuel consumed during the period
                  </Typography>
                  <Typography variant="body2">
                    <strong>Specific Consumption</strong> = Fuel consumption per unit of energy produced
                  </Typography>
                </Box>
              </Popover>
            </Box>

            {/* Consumption Chart */}
            <Card sx={{ mb: 3 }}>
              <CardHeader
                title="Fuel Consumption by Central"
                sx={{ backgroundColor: 'grey.100' }}
              />
              <CardContent>
                <Box sx={{ height: 320 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={prepareConsumptionChartData()} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="consumption" name="Total Consumption" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>

            {/* Consumption Tables */}
            {filteredData.map((central) => (
              <Card key={central.central_id} sx={{ mb: 3 }}>
                <CardHeader
                  title={`${central.central_name} Central`}
                  sx={{ backgroundColor: 'grey.100' }}
                />
                <CardContent sx={{ p: 0 }}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Turbine</TableCell>
                          <TableCell align="right">Fuel Consumption</TableCell>
                          <TableCell align="right">Specific Consumption</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.entries(central.consumption.turbines).map(([turbineName, data]) => (
                          <TableRow key={`${central.central_id}-${turbineName}`}>
                            <TableCell sx={{ fontWeight: 'bold' }}>{turbineName}</TableCell>
                            <TableCell align="right">{Number(data.fuel_consumption).toLocaleString()}</TableCell>
                            <TableCell align="right">{data.specific_consumption}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow sx={{ backgroundColor: 'grey.50' }}>
                          <TableCell sx={{ fontWeight: 'bold' }}>Total/Average</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                            {Number(central.consumption.total.fuel_consumption).toLocaleString()}
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                            {central.consumption.average.specific_consumption}
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

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" py={8}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Loading performance data...
        </Typography>
      </Box>
    );
  }

  if (!performanceData) {
    return (
      <Box py={4}>
        <Alert severity="info">
          No data loaded. Please select a date range and click "Monitor" to load performance data.
        </Alert>
      </Box>
    );
  }

  if (filteredData.length === 0) {
    return (
      <Box py={4}>
        <Alert severity="warning">
          No performance data available for the selected centrals and date range.
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
        Performance Dashboard
      </Typography>

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

