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
  StatusLabel,
  DeleteButton,
} from './AlarmTable.styles'; 

import formatdatetime from '../utils/formatdatetime';
import useDeleteEquipement from '../hooks/deleteequipement';
import { useState } from 'react';
import AddMaintenanceTaskForm from '../../maintenance/components/maintenanceForm';

const { formatDate, formatTime } = formatdatetime;



const Equipementsmdl = ({ equipements: initialEquipements = [],  title = "Equipements", subtitle = "Equipement list",}) => {

   
  const { equipements, deleteEquipement, setEquipements } = useDeleteEquipement(initialEquipements);
  const [showAddMaintenance, setShowAddMaintenance] = useState(false);
  const [selectedEquipement, setSelectedEquipement] = useState(null);


  const handleOpenMaintenance = (equipement) => {
    setSelectedEquipement(equipement);
    setShowAddMaintenance(true);
  };

  const handleCloseMaintenance = () => {
    setShowAddMaintenance(false);
    setSelectedEquipement(null);
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

      {/* Equipement Table */}
      <StyledTableContainer component={Paper}>
        <Table>
          <StyledTableHead>
            <TableRow>
              <StyledTableCell>Turbine</StyledTableCell>
              <StyledTableCell>KKS</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Created At</StyledTableCell>
              <StyledTableCell>Reported At</StyledTableCell>
              <StyledTableCell>Fixed At</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {equipements.length > 0 ? (
              equipements.map((eq) => (
                <TableRow key={eq.id} sx={{ '&:hover': { backgroundColor: '#fafafa' } }}>
                  <StyledBodyCell>{eq.turbine_name}</StyledBodyCell>
                  <StyledBodyCell>{eq.kks}</StyledBodyCell>
                  <StyledBodyCell>{eq.description}</StyledBodyCell>
                  <StyledBodyCell>
                    <StatusLabel
                      sx={{
                        backgroundColor:
                          eq.status === 'Not Fixed'
                            ? '#ffebee'
                            : eq.status === 'Pending'
                            ? '#fff3e0'
                            : '#e8f5e9',
                        color:
                          eq.status === 'Not Fixed'
                            ? '#c62828'
                            : eq.status === 'Pending'
                            ? '#ef6c00'
                            : '#2e7d32',
                      }}
                    >
                      {eq.status}
                    </StatusLabel>
                  </StyledBodyCell>
                  <StyledBodyCell>{formatDate(eq.created_at)} {formatTime(eq.created_at)}</StyledBodyCell>
                  <StyledBodyCell>{formatDate(eq.reported_at)} {formatTime(eq.reported_at)}</StyledBodyCell>
                  <StyledBodyCell>
                    {eq.fixed_at ? `${formatDate(eq.fixed_at)} ${formatTime(eq.fixed_at)}` : '-'}
                  </StyledBodyCell>
                  <StyledBodyCell>
                    {title === "Unfixed Equipements" && (
                      <Button
                        onClick={() => handleOpenMaintenance(eq)}
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
                    <DeleteButton onClick={() => deleteEquipement(eq.id)} size="small">
                      Delete
                    </DeleteButton>
                  </StyledBodyCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <StyledBodyCell colSpan={8} align="center">
                  <Typography color="textSecondary">No equipment found</Typography>
                </StyledBodyCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>

      {/* Maintenance Modal */}
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
        <DialogContent>
          <AddMaintenanceTaskForm
            type="Systematic"
            related_item_type="DefectiveEquipement"
            related_item_id={selectedEquipement?.id}
            handleCloseMaintenance={handleCloseMaintenance}
            setAlarms={setEquipements} // You can rename this prop in the form to be more generic
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Equipementsmdl;
