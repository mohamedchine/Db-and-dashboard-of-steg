import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  TextField
} from '@mui/material';
import {
  Menu as MenuIcon,
  Power as PowerIcon
} from '@mui/icons-material';
import useAuth from '../../context/useAuth'
const drawerWidth = 240;

const Navbar = ({ handleDrawerToggle, dateRange, setDateRange }) => {
  const {user} = useAuth();
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
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
        <PowerIcon sx={{ mr: 2 }} />
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          {user.unitname} 
        </Typography>
        
        {/* Date Range (Periode) */}
        <Box sx={{ display: 'flex', gap: 1, mr: 2 }}>
          <TextField
            type="date"
            value={dateRange.from}
            onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
            size="small"
            sx={{ 
              '& .MuiInputBase-input': { color: 'white' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }
            }}
          />
          <TextField
            type="date"
            value={dateRange.to}
            onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
            size="small"
            sx={{ 
              '& .MuiInputBase-input': { color: 'white' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

