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
  TableHead,
  TableCell,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import {
  StyledTableContainer,
  StyledTableCell,
  StyledBodyCell,
  StatusLabel,
  DeleteButton,
} from './AlarmTable.styles';

import formatdatetime from '../utils/formatdatetime';
import useDeleteMaintenance from '../hooks/deletemaintenance';
import { useState } from 'react';
import Relateditem from './relateditem';
const { formatDate, formatTime } = formatdatetime;

const MaintenanceMdl = ({
  maintenances: initialMaintenances = [],
  title = 'Maintenance Tasks',
  subtitle = 'List of maintenance tasks',
}) => {
  const [selectedRelatedItem, setSelectedRelatedItem] = useState(null);
  const { Maintenances, deleteMaintenance } = useDeleteMaintenance(initialMaintenances);

  const handleRelatedItemClick = (relatedItem) => {
    setSelectedRelatedItem(relatedItem);
    // console.log(relatedItem);
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

      {/* Maintenance Table */}
      <StyledTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Turbine</StyledTableCell>
              <StyledTableCell>KKS</StyledTableCell>
              <StyledTableCell>OT Number</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Related Item</StyledTableCell>
              <StyledTableCell>Created At</StyledTableCell>
              <StyledTableCell>Start</StyledTableCell>
              <StyledTableCell>End</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Maintenances.length > 0 ? (
              Maintenances.map((task) => (
                <TableRow key={task.id} sx={{ '&:hover': { backgroundColor: '#fafafa' } }}>
                  <StyledBodyCell>{task.turbine_name || '-'}</StyledBodyCell>
                  <StyledBodyCell>{task.kks}</StyledBodyCell>
                  <StyledBodyCell>{task.ot_number}</StyledBodyCell>
                  <StyledBodyCell>{task.description}</StyledBodyCell>
                  <StyledBodyCell>
                      <Button
                      // closure
                        onClick={() => handleRelatedItemClick(task.related_item)}
                        size="small"
                        sx={{
                          textTransform: 'none',
                          color: '#1976d2',
                          fontWeight: 500,
                          padding: 0,
                          minWidth: 0,
                          '&:hover': {
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        {task.related_item_type}: {task.related_item_type==="Alarm" ? task.related_item.alarm_code : task.related_item.kks }
                      </Button>
                  </StyledBodyCell>
                  <StyledBodyCell>{formatDate(task.created_at)} {formatTime(task.created_at)}</StyledBodyCell>
                  <StyledBodyCell>{formatDate(task.start)} {formatTime(task.start)}</StyledBodyCell>
                  <StyledBodyCell>{task.end ? `${formatDate(task.end)} ${formatTime(task.end)}` : '-'}</StyledBodyCell>
                  <StyledBodyCell>
                    <DeleteButton onClick={() => deleteMaintenance(task.id)} size="small">
                      Delete
                    </DeleteButton>
                  </StyledBodyCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <StyledBodyCell colSpan={9} align="center">
                  <Typography color="textSecondary">No maintenance tasks found</Typography>
                </StyledBodyCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>
      <Dialog
         open={Boolean(selectedRelatedItem)} // Make sure it's a boolean
         onClose={() => setSelectedRelatedItem(null)}
         PaperProps={{
           style: {
             backgroundColor: 'white',
             width: 'fit-content',
             maxWidth: '90vw', 
             height: 'fit-content',
             maxHeight: '90vh' 
           },
         }}
       >
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => setSelectedRelatedItem(null)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{marginTop:'20px'}}>
          <Relateditem obj={selectedRelatedItem} ></Relateditem>
        </DialogContent>
       </Dialog>
    </Box>
  );
};

export default MaintenanceMdl;