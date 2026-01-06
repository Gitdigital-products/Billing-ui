import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Grid,
  Box,
  TextField,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  Visibility,
  Edit,
  Flag,
  AccountBalance,
} from '@mui/icons-material';
import { format } from 'date-fns';

const ComplianceReview = ({ caseData, onApprove, onReject, onEscalate }) => {
  const [notes, setNotes] = useState('');
  const [showDetail, setShowDetail] = useState(false);
  const [actionDialog, setActionDialog] = useState(null);

  const getRiskColor = (riskLevel) => {
    const colors = {
      high: 'error',
      medium: 'warning',
      low: 'success',
    };
    return colors[riskLevel] || 'default';
  };

  const handleAction = (action) => {
    setActionDialog({
      action,
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} Case`,
      message: `Are you sure you want to ${action} this compliance case?`,
    });
  };

  const confirmAction = () => {
    if (actionDialog.action === 'approve') {
      onApprove(caseData.id, notes);
    } else if (actionDialog.action === 'reject') {
      onReject(caseData.id, notes);
    } else if (actionDialog.action === 'escalate') {
      onEscalate(caseData.id, notes);
    }
    setActionDialog(null);
    setNotes('');
  };

  return (
    <>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Case #{caseData.caseId}
              </Typography>
              <Typography color="textSecondary">
                Customer: {caseData.customerName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Amount: ${caseData.amount.toLocaleString()}
              </Typography>
            </Grid>

            <Grid item xs={12} md={3}>
              <Chip
                label={caseData.riskLevel.toUpperCase()}
                color={getRiskColor(caseData.riskLevel)}
                size="small"
              />
              <Box mt={1}>
                <Chip
                  icon={<Flag />}
                  label={caseData.complianceType}
                  variant="outlined"
                  size="small"
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={3}>
              <Typography variant="body2">
                Created: {format(new Date(caseData.createdAt), 'MMM dd, yyyy')}
              </Typography>
              <Typography variant="body2">
                Due: {format(new Date(caseData.dueDate), 'MMM dd, yyyy')}
              </Typography>
            </Grid>

            <Grid item xs={12} md={2}>
              <IconButton onClick={() => setShowDetail(!showDetail)}>
                <Visibility />
              </IconButton>
              <IconButton>
                <Edit />
              </IconButton>
            </Grid>
          </Grid>

          {showDetail && (
            <Box mt={3}>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Rule Violated</TableCell>
                      <TableCell>Severity</TableCell>
                      <TableCell>Transaction ID</TableCell>
                      <TableCell>Account Number</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {caseData.violations.map((violation, index) => (
                      <TableRow key={index}>
                        <TableCell>{violation.rule}</TableCell>
                        <TableCell>
                          <Chip
                            label={violation.severity}
                            size="small"
                            color={getRiskColor(violation.severity)}
                          />
                        </TableCell>
                        <TableCell>{violation.transactionId}</TableCell>
                        <TableCell>{violation.accountNumber}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box mt={2}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Review Notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes for your decision..."
                />
              </Box>

              <Box mt={2} display="flex" gap={1} justifyContent="flex-end">
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<CheckCircle />}
                  onClick={() => handleAction('approve')}
                >
                  Approve
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<Cancel />}
                  onClick={() => handleAction('reject')}
                >
                  Reject
                </Button>
                <Button
                  variant="outlined"
                  color="warning"
                  startIcon={<AccountBalance />}
                  onClick={() => handleAction('escalate')}
                >
                  Escalate
                </Button>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={!!actionDialog}
        onClose={() => setActionDialog(null)}
      >
        <DialogTitle>{actionDialog?.title}</DialogTitle>
        <DialogContent>
          <Alert severity="warning">
            {actionDialog?.message}
            {notes && (
              <>
                <br />
                <strong>Notes:</strong> {notes}
              </>
            )}
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setActionDialog(null)}>Cancel</Button>
          <Button onClick={confirmAction} variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ComplianceReview;
