import React, { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Pagination,
  CircularProgress,
  Tooltip,
  Divider
} from "@mui/material";
import useGetAccounts from './hooks/getaccountshook';
import useToggleAccountStatus from './hooks/togglestatus';

const AccountManagement = () => {
  const { getaccounts, loading, accounts,setaccounts } = useGetAccounts();
  const { toggleStatus, loadingB } = useToggleAccountStatus();
  useEffect(() => {
    getaccounts();
  }, []);

  const toggleAccountStatus = async(id, isActive) => {
    // TODO: implement API call to toggle status
    await toggleStatus(id, isActive,setaccounts);
  };

 
  

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Accounts Management
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {loading && <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>}     
      {!loading &&<TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell>{account.fullname}</TableCell>
                <TableCell>{account.steg_email}</TableCell>
                <TableCell>
                  <Chip
                    
                    label={account.is_active ? 'Active' : 'Inactive'}
                    color={account.is_active ? 'success' : 'error'}
                    size="small"
                    sx={{ pointerEvents: 'none' }}
                    onClick={(e) => e.stopPropagation()}
                  />
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color={account.is_active ? 'error' : 'success'}
                    onClick={() => toggleAccountStatus(account.id, account.is_active)}
                  >
                    {account.is_active ? 'Deactivate' : 'Activate'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
    </Box>
  );
}
export default AccountManagement;
