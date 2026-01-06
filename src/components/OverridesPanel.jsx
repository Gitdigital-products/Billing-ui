import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  Chip,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Refresh,
  History,
  Lock,
  LockOpen,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createOverride, getOverrides, updateOverride } from '../services/overrideService';

const OverridesPanel = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editOverride, setEditOverride] = useState(null);
  const [formData, setFormData] = useState({
    overrideType: '',
    reason: '',
    amount: '',
    currency: 'USD',
    customerId: '',
    expirationDate: '',
    notes: '',
  });

  const queryClient = useQueryClient();

  const { data: overrides, isLoading } = useQuery({
    queryKey: ['overrides'],
    queryFn: getOverrides,
  });

  const createMutation = useMutation({
    mutationFn: createOverride,
    onSuccess: () => {
      queryClient.invalidateQueries(['overrides']);
      setShowCreateForm(false);
      setFormData({
        overrideType: '',
        reason: '',
        amount: '',
        currency: 'USD',
        customerId: '',
        expirationDate: '',
        notes: '',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateOverride,
    onSuccess: () => {
      queryClient.invalidateQueries(['overrides']);
      setEditOverride(null);
    },
  });

  const handleSubmit = () => {
    if (editOverride) {
      updateMutation.mutate({ id: editOverride.id, ...formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const getStatusChip = (status) => {
    const colors = {
      active: 'success',
      pending: 'warning',
      expired: 'error',
      revoked: 'default',
    };

    const icons = {
      active: <LockOpen fontSize="small" />,
      pending: <History fontSize="small" />,
      expired: <Lock fontSize="small" />,
      revoked: <Lock fontSize="small" />,
    };

    return (
      <Chip
        icon={icons[status]}
        label={status.toUpperCase()}
        color={colors[status]}
        size="small"
      />
    );
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5">Billing Overrides</Typography>
          <Box>
            <Button
              startIcon={<Add />}
              variant="contained"
              onClick={() => setShowCreateForm(true)}
              sx={{ mr: 1 }}
            >
              New Override
            </Button>
            <Button startIcon={<Refresh />} variant="outlined">
              Refresh
            </Button>
          </Box>
        </Box>

        {showCreateForm && (
          <Box mb={3} p={2} border={1} borderColor="divider" borderRadius={1}>
            <Typography variant="h6" gutterBottom>
              Create New Override
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Override Type</InputLabel>
                  <Select
                    value={formData.overrideType}
                    label="Override Type"
                    onChange={(e) =>
                      setFormData({ ...formData, overrideType: e.target.value })
                    }
                  >
                    <MenuItem value="fee_waiver">Fee Waiver</MenuItem>
                    <MenuItem value="discount">Discount</MenuItem>
                    <MenuItem value="payment_extension">Payment Extension</MenuItem>
                    <MenuItem value="limit_increase">Limit Increase</MenuItem>
                    <MenuItem value="compliance_exception">Compliance Exception</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  size="small"
                  label="Amount"
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  size="small"
                  label="Customer ID"
                  value={formData.customerId}
                  onChange={(e) =>
                    setFormData({ ...formData, customerId: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Reason"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end" gap={1}>
                  <Button onClick={() => setShowCreateForm(false)}>Cancel</Button>
                  <Button variant="contained" onClick={handleSubmit}>
                    Create Override
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}

        <Divider sx={{ my: 2 }} />

        {isLoading ? (
          <Typography>Loading overrides...</Typography>
        ) : (
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created By</TableCell>
                  <TableCell>Expires</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {overrides?.map((override) => (
                  <TableRow key={override.id}>
                    <TableCell>{override.overrideId}</TableCell>
                    <TableCell>
                      <Chip label={override.type.replace('_', ' ')} size="small" />
                    </TableCell>
                    <TableCell>{override.customerName}</TableCell>
                    <TableCell>
                      {override.currency} {override.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>{getStatusChip(override.status)}</TableCell>
                    <TableCell>{override.createdBy}</TableCell>
                    <TableCell>
                      {override.expirationDate
                        ? format(new Date(override.expirationDate), 'MM/dd/yyyy')
                        : 'No expiration'}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          onClick={() => {
                            setEditOverride(override);
                            setFormData({
                              overrideType: override.type,
                              reason: override.reason,
                              amount: override.amount,
                              currency: override.currency,
                              customerId: override.customerId,
                              expirationDate: override.expirationDate,
                              notes: override.notes,
                            });
                          }}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Revoke">
                        <IconButton size="small">
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default OverridesPanel;
