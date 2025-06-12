import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import axs from "../../../../../api/customizedaxios";
import useAuth from '../../../../../context/useAuth'
import { toast } from "react-toastify";
import toISOString from "../../alarms/utils/formatdate";
const AddMaintenanceTaskForm = ({ type, related_item_type, related_item_id ,handleCloseMaintenance,setAlarms}) => {
    const [kks, setKks] = useState("");
    const [otNumber, setOtNumber] = useState("");
    const [description, setDescription] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const {user} = useAuth();
    const handleSubmit = async (e) => {
      e.preventDefault();
      //creating the maintenance object
      const maintenanceData = {
        type,
        related_item_type,
        related_item_id,
        kks,
        ot_number: otNumber,
        description
      };
      
      if (toISOString(start)) {
        maintenanceData.start = toISOString(start);
      }
    
      if (toISOString(end)) {
        maintenanceData.end = toISOString(end);
      }
      



      try {
        const response = await axs.post(`/maintenance/add/${user.central_id}`, maintenanceData);
        setAlarms(prev => prev.filter(alarm => alarm.id !== related_item_id));
        handleCloseMaintenance();
        toast.success(response.data.message);
       
      } catch (e) {
        toast.error(e.response.data.message);
      }
      



    };
    
    return (
      <Box sx={{ p: 2, borderRadius: 2, maxWidth: 600, margin: "auto" }}>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Add Maintenance Task
        </Typography>
  
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2, // Spacing between fields
          }}
        >
          {/* KKS */}
          <TextField
            label="KKS"
            fullWidth
            inputProps={{ maxLength: 255 }}
            value={kks}
            onChange={(e) => setKks(e.target.value)}
          />
  
          {/* OT Number */}
          <TextField
            label="OT Number"
            fullWidth
            inputProps={{ maxLength: 255 }}
            value={otNumber}
            onChange={(e) => setOtNumber(e.target.value)}
          />
  
          {/* Description */}
          <TextField
            label="Description"
            multiline
            rows={4}
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
  
          {/* Start Date */}
          <TextField
            label="Start Date"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
  
          {/* End Date */}
          <TextField
            label="End Date"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
  
          {/* Submit Button */}
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Add Maintenance
            </Button>
          </Box>
        </Box>
      </Box>
    );
  };
  
  export default AddMaintenanceTaskForm;