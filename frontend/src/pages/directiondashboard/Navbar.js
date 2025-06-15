import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton
} from '@mui/material';
import {
  Menu as MenuIcon
} from '@mui/icons-material';
import useAuth from '../../context/useAuth';
const Navbar = ({ handleDrawerToggle }) => {
  const {user} = useAuth();
  return (
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
          {user.unitname}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

