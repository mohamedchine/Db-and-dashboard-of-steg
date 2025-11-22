import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import BuildIcon from '@mui/icons-material/Build';
import AssessmentIcon from '@mui/icons-material/Assessment';
import HistoryIcon from '@mui/icons-material/History';
import PowerIcon from '@mui/icons-material/Power';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import './sidebar.css';
import useAuth from '../../../../context/useAuth';
import useLogout from '../../../../hooks/logout';
import axs from '../../../../api/customizedaxios';
import { toast } from 'react-toastify';
import ApartmentIcon from '@mui/icons-material/Apartment';

const Sidebbar = () => {
    const {user, setuser} = useAuth();
   
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const logout = useLogout();
    // Navigation items with their routes and icons
    const navItems = [
        { text: 'Alarms', icon: <WarningIcon />, path: 'alarms'},
        { text: 'Defective Equipment', icon: <BuildIcon />, path: 'defective-equipement' },
        { text: 'Maintenance', icon: <PowerIcon />, path: 'maintenance'},
        { text: 'Performance', icon: <AssessmentIcon />, path: 'performance' },
        { text: 'Activity Log', icon: <HistoryIcon />, path: 'activity-log' },
        { text: 'Manage Accounts', icon: <ManageAccountsIcon />, path: 'account-management' },
    ];

    const handleNavigation = async (path) => {
        if (path === 'account-management') {
            try {
                //we check the user might no longer be an admin(i didnt do it in report i only did if(user.is_chief))
                const res = await axs.get("/auth/check");
                setuser(res.data.user); 
    
                if (res.data.user.is_chief) {
                    navigate(`/central/dashboard/${path}`, {
                        state: { fromSidebar: true }
                      });
                } else {
                    toast.error("Only the chief is allowed to access this section.");
                }
            } catch (err) {
                console.error(err);
                toast.error("Authorization check failed.");
            }
        } else {
            navigate(`/central/dashboard/${path}`);
        }
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 280,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 280,
                    boxSizing: 'border-box',
                    backgroundColor: '#f5f7fa',
                    borderRight: 'none',
                },
            }}
        >
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <ApartmentIcon sx={{ color: '#1976d2' }} />
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                    Central {user.unitname}
                </Typography>
            </Box>
            
            <Typography variant="subtitle2" sx={{ px: 2, py: 1, color: '#666' }}>
                Sections
            </Typography>
            
            <List sx={{ px: 1 }}>
                {navItems.map((item) => (
                    <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                        <ListItemButton
                            onClick={() => handleNavigation(item.path)}
                            sx={{
                                borderRadius: '8px',
                                backgroundColor: currentPath.includes(item.path) ? '#e3f2fd' : 'transparent',
                                '&:hover': {
                                    backgroundColor: currentPath.includes(item.path) ? '#e3f2fd' : '#f0f0f0',
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: currentPath.includes(item.path) ? '#1976d2' : '#666' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText 
                                primary={item.text} 
                                sx={{ color: currentPath.includes(item.path) ? '#1976d2' : '#333' }}
                            />
                            {item.badge && (
                                <Box
                                    sx={{
                                        backgroundColor: '#ff5252',
                                        color: 'white',
                                        borderRadius: '12px',
                                        padding: '2px 8px',
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold',
                                        minWidth: '24px',
                                        textAlign: 'center',
                                    }}
                                >
                                  
                                </Box>
                            )}
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            
            <Divider sx={{ mt: 2 }} />
            
            <Box sx={{ p: 2, mt: 'auto' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            backgroundColor: '#e0e0e0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography sx={{ fontWeight: 'bold' }}>OP</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                            {user.fullname}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#666' }}>
                            {user.steg_email}
                        </Typography>
                    </Box>
                </Box>
                <Box 
                  sx={{ 
                      display: 'flex', 
                      justifyContent: 'flex-end', 
                      alignItems: 'center', 
                      gap: 1, 
                      mt: 2, 
                      color: '#ff002d' 
                  }}
                
              >
                  <Typography variant="body2" sx={{ fontWeight: 500 ,  cursor: 'pointer' }} onClick={()=>logout()}>
                      Logout
                  </Typography>
                  <LogoutIcon fontSize="small" sx={{   cursor: 'pointer' }} onClick={()=>logout()} />
              </Box>

            </Box>
        </Drawer>
    );
};

export default Sidebbar;