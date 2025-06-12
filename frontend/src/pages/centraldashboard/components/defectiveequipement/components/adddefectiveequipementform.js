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
import "./addalarmform.css";
import { toast } from 'react-toastify';
import axs from '../../../../../api/customizedaxios';
import useAuth from '../../../../../context/useAuth';
import toISOString from '../utils/formatdate';

const DefectiveEquipmentForm = ({ turbineId }) => {
  const { user } = useAuth();

  const [reportedAt, setReportedAt] = useState('');
  const [fixedAt, setFixedAt] = useState('');
  const [kks, setKks] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (turbineId === 'all') {
      toast.error("Please select a turbine from the top.");
      return;
    }

    const equipmentData = {
      reported_at: toISOString(reportedAt),
      fixed_at: toISOString(fixedAt),
      turbine_id: turbineId,
      kks,
      description,
    };

    try {
      setLoading(true);
      const response = await axs.post(`/defectiveequipements/add/${user.central_id}`, equipmentData);
      toast.success(response.data.message);
    } catch (error) {
     toast.error(error.response.data.message)
    } finally {
      setLoading(false);
    }
    
    
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 2, maxWidth: 600, margin: 'auto' }} className='addalarmform'>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Add Defective Equipment
      </Typography>

      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          label="Reported At"
          type="datetime-local"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={reportedAt}
          onChange={(e) => setReportedAt(e.target.value)}
        />

        <TextField
          label="KKS"
          placeholder="e.g. L30VS_A_ALM"
          fullWidth
          value={kks}
          onChange={(e) => setKks(e.target.value)}
        />

        <TextField
          label="Description"
          placeholder="Describe the issue"
          multiline
          rows={3}
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <TextField
          label="Fixed At"
          type="datetime-local"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={fixedAt}
          onChange={(e) => setFixedAt(e.target.value)}
        />

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" startIcon={<SaveIcon />} disabled={loading} type="submit">
            {loading ? <CircularProgress size={14} sx={{ color: 'inherit' }} /> : "Save"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default DefectiveEquipmentForm;
