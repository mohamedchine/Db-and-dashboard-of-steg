import { styled } from '@mui/material';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';

// Styled Components
export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  boxShadow: 'none',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
}));

export const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: '#f5f5f5',
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
  color: '#666',
  fontSize: '0.875rem',
  padding: '16px',
}));

export const StyledBodyCell = styled(TableCell)(({ theme }) => ({
  padding: '16px',
  fontSize: '0.875rem',
  borderBottom: '1px solid #f0f0f0',
}));

// Chip-like Labels
export const AlarmCodeLabel = styled(Typography)(({ theme }) => ({
  backgroundColor: '#e3f2fd', // Light blue background
  color: '#1565c0',           // Dark blue text
  fontWeight: 600,
  fontSize: '0.75rem',
  padding: '4px 8px',
  borderRadius: '4px',
  display: 'inline-block',
}));

export const StatusLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  fontWeight: 600,
  padding: '4px 8px',
  borderRadius: '4px',
  display: 'inline-block',
}));

export const DeleteButton = styled(Button)(({ theme }) => ({
  color: '#ff5722',
  textTransform: 'none',
  fontWeight: 500,
  padding: '4px 8px',
  minWidth: 'auto',
  '&:hover': {
    backgroundColor: '#fff3e0',
  },
}));