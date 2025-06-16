"use client"
import transformActivities from './formatdatautils';
import axs from '../../../../api/customizedaxios'
import {TurbinesContext} from '../../../../context/turbinesContext';
import React, { useState, useEffect, useContext } from "react"
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
 
  Tooltip,Divider
} from "@mui/material"
import {
  Visibility as VisibilityIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material"
import useAuth from '../../../../context/useAuth'
const ValueDialog = ({ open, onClose, title, oldValue, newValue }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{title} - Value Changes</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", md: "row" } }}>
          {oldValue && (
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" color="error" gutterBottom>
                Old Value
              </Typography>
              <Paper sx={{ p: 2, bgcolor: "#ffebee" }}>
                <pre style={{ whiteSpace: "pre-wrap", fontSize: "12px" }}>{JSON.stringify(oldValue, null, 2)}</pre>
              </Paper>
            </Box>
          )}
          {newValue && (
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" color="success.main" gutterBottom>
                New Value
              </Typography>
              <Paper sx={{ p: 2, bgcolor: "#e8f5e8" }}>
                <pre style={{ whiteSpace: "pre-wrap", fontSize: "12px" }}>{JSON.stringify(newValue, null, 2)}</pre>
              </Paper>
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
const ActivityLog = () => {
  const { turbines } = useContext(TurbinesContext);
  
  const {user} = useAuth();
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogData, setDialogData] = useState({
    title: "",
    oldValue: null,
    newValue: null,
  })


  const centralId = user.central_id;

  const fetchActivities = async (pageNum) => {
    try {
      setLoading(true)
      const response = await axs.get(`/activitylogs/${centralId}?page=${pageNum}`);
      console.log(response.data.data);
      setActivities(transformActivities(response.data.data,turbines));
      setTotalPages(response.data.total);
      } catch(e){
        console.log(e);
      }
      finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchActivities(page)
  }, [page])

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  const getActionIcon = (action) => {
    switch (action) {
      case "add":
        return <AddIcon color="success" />
      case "update":
        return <EditIcon color="warning" />
      case "delete":
        return <DeleteIcon color="error" />
      default:
        return null
    }
  }

  const getActionColor = (action) => {
    switch (action) {
      case "add":
        return "success"
      case "update":
        return "warning"
      case "delete":
        return "error"
      default:
        return "default"
    }
  }

  const handleTargetClick = (activity) => {
    setDialogData({
      title: `Target: ${activity.target_table}`,
      oldValue: activity.target_table_old_value,
      newValue: activity.target_table_new_value,
    })
    setDialogOpen(true)
  }

  const handleConsequenceClick = (activity) => {
    if (activity.consequence_table) {
      setDialogData({
        title: `Consequence: ${activity.consequence_table}`,
        oldValue: activity.consequence_table_old_value,
        newValue: activity.consequence_table_new_value,
      })
      setDialogOpen(true)
    }
  }

 

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    )
  }



  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Activities Log
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "primary.main" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Employee Email</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Action</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Target</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Consequence</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id} hover sx={{ "&:nth-of-type(odd)": { bgcolor: "action.hover" } }}>
                <TableCell>
                  <Tooltip title={activity.central_user_email}>
                    <Typography variant="body2">{activity.central_user_email}</Typography>
                  </Tooltip>
                </TableCell>

                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    {getActionIcon(activity.action)}
                    <Chip label={activity.action} color={getActionColor(activity.action)} size="small" onClick={(e) => e.stopPropagation()} sx={{ pointerEvents: 'none' }}    />
                  </Box>
                </TableCell>

                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="body2">{activity.target_table}</Typography>
                    <IconButton size="small" onClick={() => handleTargetClick(activity)} color="primary">
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>

                <TableCell>
                  {activity.consequence_table ? (
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="body2">{activity.consequence_table}</Typography>
                      <IconButton size="small" onClick={() => handleConsequenceClick(activity)} color="secondary">
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                    -
                  </Typography>
                  )}
                </TableCell>

                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(activity.created_at)}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {activities.length === 0 && (
        <Box textAlign="center" py={4}>
          <Typography variant="h6" color="text.secondary">
            No activity logs found
          </Typography>
        </Box>
      )}

      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
      </Box>

      <ValueDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={dialogData.title}
        oldValue={dialogData.oldValue}
        newValue={dialogData.newValue}
      />
    </Box>
  )
}

export default ActivityLog;