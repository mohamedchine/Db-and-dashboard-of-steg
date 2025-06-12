import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import {
  StyledTableContainer,
  StyledTableHead,
  StyledTableCell,
  StyledBodyCell,
  AlarmCodeLabel,
  StatusLabel,
  DeleteButton,
} from './AlarmTable.styles';

import formatdatetime from '../utils/formatdatetime';
import useDeleteAlarm from '../hooks/deletealarms';
import { useState } from 'react';
import AddMaintenanceTaskForm from '../../maintenance/components/maintenanceForm';

const { formatDate, formatTime } = formatdatetime;

const Alamrsmdl = ({ alarms: initialAlarms = [], title = "Alarms", subtitle = "Alarm list" }) => {
  const { alarms, deleteAlarm ,setAlarms} = useDeleteAlarm(initialAlarms);
  const [showAddMaintenance, setShowAddMaintenance] = useState(false);
  const [selectedAlarm, setSelectedAlarm] = useState(null);
  const handleOpenMaintenance = (alarm) => {
    setSelectedAlarm(alarm);
  
    setShowAddMaintenance(true);
  };

  const handleCloseMaintenance = () => {
    setShowAddMaintenance(false);
    setSelectedAlarm(null);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, color: '#333', mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: '#666', fontSize: '0.875rem' }}>
          {subtitle}
        </Typography>
      </Box>

      {/* Alarm Table */}
      <StyledTableContainer component={Paper}>
        <Table>
          <StyledTableHead>
            <TableRow>
              <StyledTableCell>Turbine</StyledTableCell>
              <StyledTableCell>Alarm Code</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Created At</StyledTableCell>
              <StyledTableCell>Happened At</StyledTableCell>
              <StyledTableCell>Resolved At</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {alarms.length > 0 ? (
              alarms.map((alarm) => (
                <TableRow key={alarm.id} sx={{ '&:hover': { backgroundColor: '#fafafa' } }}>
                  <StyledBodyCell>{alarm.turbine_name}</StyledBodyCell>
                  <StyledBodyCell><AlarmCodeLabel>{alarm.alarm_code}</AlarmCodeLabel></StyledBodyCell>
                  <StyledBodyCell>{alarm.description}</StyledBodyCell>
                  <StyledBodyCell>
                    <StatusLabel
                      sx={{
                        backgroundColor:
                          alarm.status === 'Active'
                            ? '#ffebee'
                            : alarm.status === 'Pending'
                              ? '#fff3e0'
                              : '#e8f5e9',
                        color:
                          alarm.status === 'Active'
                            ? '#c62828'
                            : alarm.status === 'Pending'
                              ? '#ef6c00'
                              : '#2e7d32',
                      }}
                    >
                      {alarm.status}
                    </StatusLabel>
                  </StyledBodyCell>
                  <StyledBodyCell>{formatDate(alarm.created_at)} {formatTime(alarm.created_at)}</StyledBodyCell>
                  <StyledBodyCell>{formatDate(alarm.happened_at)} {formatTime(alarm.happened_at)}</StyledBodyCell>
                  <StyledBodyCell>
                    {alarm.resolved_at ? `${formatDate(alarm.resolved_at)} ${formatTime(alarm.resolved_at)}` : '-'}
                  </StyledBodyCell>
                  <StyledBodyCell>
                    {title === "Unresolved Alarms" && (
                      <Button
                        onClick={() => handleOpenMaintenance(alarm)}
                        size="small"
                        sx={{
                          textTransform: 'none',
                          fontWeight: 500,
                          padding: '4px 8px',
                          color: '#4caf50',
                          '&:hover': { backgroundColor: '#e8f5e9' },
                          marginRight: '8px',
                        }}
                      >
                        Add Maintenance
                      </Button>
                    )}
                    <DeleteButton onClick={() => deleteAlarm(alarm.id)} size="small">
                      Delete
                    </DeleteButton>
                  </StyledBodyCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <StyledBodyCell colSpan={8} align="center">
                  <Typography color="textSecondary">No alarms found</Typography>
                </StyledBodyCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>

      {/* Maintenance Modal */}
      {/* dialog knows when we click outside it  the onclose work when we click outside*/}
      <Dialog open={showAddMaintenance} onClose={handleCloseMaintenance} maxWidth="sm" fullWidth>
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleCloseMaintenance}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent >
                  <AddMaintenanceTaskForm
            type="Systematic"
            related_item_type="Alarm"
            related_item_id={selectedAlarm?.id}
            handleCloseMaintenance={handleCloseMaintenance}
            setAlarms={setAlarms} 
          />

        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Alamrsmdl;
