import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,

} from '@mui/material';

import SaveIcon from '@mui/icons-material/Save';
import "./addalarmform.css"
import { toast } from 'react-toastify';
import axs from '../../../../../api/customizedaxios';

import useAuth from '../../../../../context/useAuth';
import  toISOString from '../utils/formatdate';



const DefectivequipementForm = ({turbineId}) => {
  const {user} = useAuth();
  const [happenedAt, setHappenedAt] = useState('');
  const [resolvedAt, setResolvedAt] = useState('');
  const [alarmCode, setAlarmCode] = useState('');
  const [description, setDescription] = useState('');
  const [loading,setloading]=useState(false);
 
  const handleSubmit = async(e) => {
    e.preventDefault();
   
    if(turbineId =='all'){
      toast.error("please select a turbine from the top");
      return ;
    } 
  
    const alarmData = {
      happened_at :toISOString(happenedAt) ,
      resolved_at : toISOString(resolvedAt),
      turbine_id:turbineId,
      alarm_code: alarmCode,
      description,
    };
  
    try {
      setloading(true);
      const response = await axs.post(`/alarms/add/${user.central_id}`, alarmData);
      toast.success(response.data.message );
    
    } catch (e) {
      const errorMessage = e.response.data.message || "Failed to add alarm";
      toast.error(errorMessage);
    } finally {
      setloading(false);
    }
    
    
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 2, maxWidth: 600, margin: 'auto' }} className='addalarmform'>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Add  Alarm
      </Typography>

      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        {/* Happened At */}
        <TextField
          label="Happened At"
          type="datetime-local"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={happenedAt}
          onChange={(e) => setHappenedAt(e.target.value)}
        />

       

        {/* Alarm Code */}
        <TextField
          label="Alarm Code"
          placeholder="e.g. L30VS_A_ALM"
          fullWidth
          value={alarmCode}
          onChange={(e) => setAlarmCode(e.target.value)}
        />

        {/* Description */}
        <TextField
          label="Description"
          placeholder="Enter alarm description"
          multiline
          rows={3}
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Resolved At */}
        <TextField
          label="Resolved At"
          type="datetime-local"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={resolvedAt}
          onChange={(e) => setResolvedAt(e.target.value)}
        />

        {/* Save Button */}
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" startIcon={<SaveIcon />  } disabled={loading}  type="submit">
            {loading ?   <CircularProgress  size={14}  sx={{ color: 'inherit' }}  /> : "Save" }
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default DefectivequipementForm;
