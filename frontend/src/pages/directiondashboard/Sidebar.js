import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../../context/useAuth';
import axs from '../../api/customizedaxios'
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider ,Box
} from '@mui/material';
import {
  Warning as WarningIcon,
  TrendingUp as PerformanceIcon
} from '@mui/icons-material';
import useLogout from '../../hooks/logout';

const drawerWidth = 240;

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const location = useLocation();
  const {user} = useAuth();
  const logout = useLogout();
  const drawer = (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Sections
        </Typography>
      </Toolbar>
      <Divider />
      <List>
  {/* PERFORMANCE FIRST */}
  <ListItem disablePadding>
    <ListItemButton
      component={Link}
      to="/direction/dashboard/performance"
      selected={location.pathname.includes('/performance') || location.pathname === '/direction/dashboard' || location.pathname === '/direction/dashboard/'}
    >
      <ListItemIcon>
        <PerformanceIcon />
      </ListItemIcon>
      <ListItemText primary="Performance Monitoring" />
    </ListItemButton>
  </ListItem>

  {/* INCIDENTS SECOND */}
  <ListItem disablePadding>
    <ListItemButton
      component={Link}
      to="/direction/dashboard/incidents"
      selected={location.pathname.includes('/incidents')}
    >
      <ListItemIcon>
        <WarningIcon />
      </ListItemIcon>
      <ListItemText primary="Incidents Monitoring" />
    </ListItemButton>
  </ListItem>
</List>
      
     
<Divider sx={{ mt: 2}} />
<Box sx={{ p: 2, mt: 'auto' }}>
  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
    {/* Avatar */}
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        backgroundColor: '#e0e0e0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <Typography sx={{ fontWeight: 'bold' }}>OP</Typography>
    </Box>

    {/* User Info */}
    <Box sx={{ wordBreak: 'break-word' }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
        {user.fullname}
      </Typography>
      <Typography variant="body2" sx={{ color: '#666' }}>
        {user.steg_email}
      </Typography>
    </Box>
  </Box>

  {/* Logout */}
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: 1,
      mt: 2,
      color: '#ff002d',
    }}
  >
    <Typography
      variant="body2"
      sx={{ fontWeight: 500, cursor: 'pointer' }}
      onClick={() => logout()}
    >
      Logout
    </Typography>
    <LogoutIcon fontSize="small" sx={{ cursor: 'pointer' }} onClick={() => logout()} />
  </Box>
</Box>

    </div>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Sidebar;
