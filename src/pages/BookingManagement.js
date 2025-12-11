import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Container, Card, CardContent, Button, AppBar, Toolbar,
  IconButton, Chip, Avatar, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import api from '../services/api';
import { formatPriceWithPeriod } from '../utils/currency';

export default function BookingManagement() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [responseDialog, setResponseDialog] = useState(false);
  const [response, setResponse] = useState('');
  const [actionType, setActionType] = useState('');

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      const ownerId = user._id || user.id;
      const { data } = await api.get(`/bookings/owner/${ownerId}`);
      setBookings(data);
    } catch (error) {
      console.error('Error loading bookings:', error);
    }
  };

  const handleAction = (booking, action) => {
    setSelectedBooking(booking);
    setActionType(action);
    setResponseDialog(true);
  };

  const submitResponse = async () => {
    try {
      await api.patch(`/bookings/${selectedBooking._id}/status`, {
        status: actionType,
        ownerResponse: response
      });
      
      setResponseDialog(false);
      setResponse('');
      loadBookings();
      alert(`Booking ${actionType === 'approved' ? 'accepted' : 'declined'} successfully!`);
    } catch (error) {
      console.error('Error updating booking:', error);
      alert('Failed to update booking');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'success';
      case 'declined': return 'error';
      default: return 'warning';
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <AppBar position="static" elevation={1} sx={{ background: 'white', color: 'text.primary' }}>
        <Toolbar>
          <IconButton edge="start" onClick={() => navigate('/profile')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flex: 1, fontWeight: 'bold' }}>
            Booking Requests
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 3 }}>
        {bookings.length === 0 ? (
          <Card sx={{ p: 4, textAlign: 'center', borderRadius: '12px' }}>
            <Typography variant="h6" gutterBottom>No booking requests</Typography>
            <Typography variant="body2" color="text.secondary">
              You'll see booking requests here when guests book your properties
            </Typography>
          </Card>
        ) : (
          <Grid container spacing={2}>
            {bookings.map((booking) => (
              <Grid item xs={12} key={booking._id}>
                <Card sx={{ borderRadius: '12px' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                      <Avatar
                        src={booking.userId?.avatar}
                        sx={{ width: 60, height: 60, bgcolor: 'primary.main' }}
                      >
                        {booking.userId?.name?.charAt(0)}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" fontWeight="bold">
                          {booking.userId?.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {booking.userId?.email}
                        </Typography>
                        <Chip 
                          label={booking.status.toUpperCase()} 
                          color={getStatusColor(booking.status)}
                          size="small"
                          sx={{ mt: 0.5 }}
                        />
                      </Box>
                    </Box>

                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      {booking.propertyId?.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      📍 {booking.propertyId?.location}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      📅 Check-in: {new Date(booking.checkIn).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      📅 Check-out: {new Date(booking.checkOut).toLocaleDateString()}
                    </Typography>
                    {booking.specialNeeds && (
                      <Typography variant="body2" sx={{ mt: 1, p: 1, bgcolor: '#f5f5f5', borderRadius: '8px' }}>
                        💬 {booking.specialNeeds}
                      </Typography>
                    )}

                    {booking.status === 'pending' && (
                      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth
                          onClick={() => handleAction(booking, 'approved')}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          fullWidth
                          onClick={() => handleAction(booking, 'declined')}
                        >
                          Decline
                        </Button>
                      </Box>
                    )}

                    {booking.ownerResponse && (
                      <Box sx={{ mt: 2, p: 2, bgcolor: '#f0f0f0', borderRadius: '8px' }}>
                        <Typography variant="caption" color="text.secondary">
                          Your Response:
                        </Typography>
                        <Typography variant="body2">{booking.ownerResponse}</Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <Dialog open={responseDialog} onClose={() => setResponseDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {actionType === 'approved' ? 'Accept Booking' : 'Decline Booking'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Message to Guest"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder={actionType === 'approved' 
              ? "Let the guest know you're excited to host them..."
              : "Politely explain why you can't accept this booking..."}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setResponseDialog(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={submitResponse}
            color={actionType === 'approved' ? 'success' : 'error'}
          >
            {actionType === 'approved' ? 'Accept' : 'Decline'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
