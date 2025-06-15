import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  TextField,
  Drawer,
  List,
  ListItem,
  Divider,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Menu as MenuIcon,
  DateRange as DateRangeIcon
} from '@mui/icons-material';

const Navbar = ({ 
  handleDrawerToggle, 
  dateRange, 
  setDateRange
}) => {
  const [dateDrawerOpen, setDateDrawerOpen] = useState(false);
  const [tempDateRange, setTempDateRange] = useState(dateRange);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleDateDrawerToggle = () => {
    setDateDrawerOpen(!dateDrawerOpen);
    if (!dateDrawerOpen) {
      setTempDateRange(dateRange);
    }
  };

  const handleDateChange = (field, value) => {
    setTempDateRange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApplyDateRange = () => {
    // Validate date range
    if (!tempDateRange.from || !tempDateRange.to) {
      setSnackbarMessage('Please select both start and end dates');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    if (new Date(tempDateRange.from) > new Date(tempDateRange.to)) {
      setSnackbarMessage('Start date cannot be after end date');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    setDateRange(tempDateRange);
    setDateDrawerOpen(false);
    setSnackbarMessage('Date range updated successfully');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - 240px)` },
          ml: { sm: `240px` },
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Groupement Dashboard
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Date Range Display */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <DateRangeIcon />
              <Typography variant="body2">
                {dateRange.from} to {dateRange.to}
              </Typography>
            </Box>

            {/* Date Range Button */}
            <Button
              color="inherit"
              variant="outlined"
              startIcon={<DateRangeIcon />}
              onClick={handleDateDrawerToggle}
              sx={{ 
                borderColor: 'rgba(255, 255, 255, 0.5)',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Change Period
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Date Range Drawer */}
      <Drawer
        anchor="right"
        open={dateDrawerOpen}
        onClose={handleDateDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: 320,
            padding: 2
          }
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Select Date Range
        </Typography>
        
        <Divider sx={{ mb: 2 }} />

        <List>
          <ListItem>
            <TextField
              label="Start Date"
              type="date"
              value={tempDateRange.from}
              onChange={(e) => handleDateChange('from', e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </ListItem>
          
          <ListItem>
            <TextField
              label="End Date"
              type="date"
              value={tempDateRange.to}
              onChange={(e) => handleDateChange('to', e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </ListItem>

          <ListItem>
            <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
              <Button
                variant="outlined"
                onClick={handleDateDrawerToggle}
                fullWidth
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleApplyDateRange}
                fullWidth
              >
                Apply
              </Button>
            </Box>
          </ListItem>
        </List>
      </Drawer>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Navbar;

