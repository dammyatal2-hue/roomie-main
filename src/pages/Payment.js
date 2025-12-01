import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Card,
  CardContent,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AddIcon from '@mui/icons-material/Add';

const paymentMethods = [
  { id: 1, type: 'Visa', last4: '4532', expiry: '12/25', isDefault: true },
  { id: 2, type: 'Mastercard', last4: '8901', expiry: '08/26', isDefault: false }
];

const transactions = [
  { id: 1, description: 'Kigali Heights Apartment', amount: '$450.00', date: '2024-01-15', status: 'Completed' },
  { id: 2, description: 'Nyarutarama Villa', amount: '$600.00', date: '2024-01-10', status: 'Pending' },
  { id: 3, description: 'Kacyiru Studio', amount: '$280.00', date: '2024-01-05', status: 'Completed' }
];

export default function Payment() {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <AppBar position="static" elevation={1} sx={{ background: 'white', color: 'text.primary' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="h1" sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>
            Payment
          </Typography>
          <Box sx={{ width: 48 }} />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 2 }}>
        {/* Payment Methods */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Payment Methods
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {paymentMethods.map((method) => (
            <Grid item xs={12} sm={6} key={method.id}>
              <Card sx={{ borderRadius: '12px' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CreditCardIcon color="primary" />
                      <Box>
                        <Typography variant="body1" fontWeight="bold">
                          {method.type} •••• {method.last4}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Expires {method.expiry}
                        </Typography>
                      </Box>
                    </Box>
                    {method.isDefault && <Chip label="Default" size="small" color="primary" />}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
          <Grid item xs={12} sm={6}>
            <Card sx={{ borderRadius: '12px', border: '2px dashed', borderColor: 'divider' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <AddIcon sx={{ fontSize: 32, color: 'text.secondary', mb: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Add New Card
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Transaction History */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Recent Transactions
        </Typography>
        <Paper elevation={1} sx={{ borderRadius: '12px' }}>
          {transactions.map((transaction, index) => (
            <Box key={transaction.id}>
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    {transaction.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {transaction.date}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="body1" fontWeight="bold">
                    {transaction.amount}
                  </Typography>
                  <Chip 
                    label={transaction.status} 
                    size="small" 
                    color={transaction.status === 'Completed' ? 'success' : 'warning'}
                  />
                </Box>
              </Box>
              {index < transactions.length - 1 && <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', mx: 2 }} />}
            </Box>
          ))}
        </Paper>
      </Container>
    </Box>
  );
}