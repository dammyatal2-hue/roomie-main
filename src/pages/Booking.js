import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  Rating,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Paper,
  Divider,
  TextField,
  Grid,
  Alert
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

export default function Booking() {
  const navigate = useNavigate();
  const location = useLocation();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const propertyData = location.state?.property || JSON.parse(sessionStorage.getItem('bookingProperty') || 'null');
    if (propertyData) {
      setProperty(propertyData);
    } else {
      navigate('/explore');
    }
  }, []);
  const [step, setStep] = useState(1); // 1: Date Selection, 2: Receipt, 3: Confirmation
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    duration: '',
    specialNeeds: ''
  });

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const calculateDuration = () => {
    if (bookingData.checkIn && bookingData.checkOut) {
      const start = new Date(bookingData.checkIn);
      const end = new Date(bookingData.checkOut);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  const calculateTotal = () => {
    const days = calculateDuration();
    const dailyRate = 340 / 30; // Convert monthly to daily
    const subtotal = days * dailyRate;
    const tax = subtotal * 0.1;
    return { subtotal: subtotal.toFixed(2), tax: tax.toFixed(2), total: (subtotal + tax).toFixed(2) };
  };

  const handleNext = () => {
    if (step === 1 && bookingData.checkIn && bookingData.checkOut) {
      setStep(2);
    }
  };

  const handleConfirm = async () => {
    if (!property) {
      console.error('No property data');
      return;
    }
    
    try {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      if (!user) {
        alert('Please login to book');
        navigate('/login');
        return;
      }
      
      const userId = user._id || user.id;
      const ownerId = typeof property.ownerId === 'object' ? property.ownerId._id : property.ownerId;
      
      const bookingPayload = {
        userId,
        propertyId: property._id,
        ownerId,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        specialNeeds: bookingData.specialNeeds
      };
      
      console.log('Sending booking:', bookingPayload);
      
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload)
      });
      
      const data = await response.json();
      console.log('Booking response:', data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Booking failed');
      }
      
      alert('Booking confirmed! Owner has been notified.');
      setStep(3);
      
      if (data.ownerId) {
        setTimeout(() => {
          navigate(`/chat/${data.ownerId}`);
        }, 2000);
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to create booking: ' + error.message);
    }
  };

  const renderDateSelection = () => (
    <Box>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Select Your Stay Duration
      </Typography>
      
      <Paper elevation={1} sx={{ p: 3, borderRadius: '12px', mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Check-in Date"
              type="date"
              value={bookingData.checkIn}
              onChange={(e) => handleInputChange('checkIn', e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Check-out Date"
              type="date"
              value={bookingData.checkOut}
              onChange={(e) => handleInputChange('checkOut', e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Special Needs (Optional)"
              placeholder="Any special requirements or requests..."
              value={bookingData.specialNeeds}
              onChange={(e) => handleInputChange('specialNeeds', e.target.value)}
            />
          </Grid>
        </Grid>
        
        {calculateDuration() > 0 && (
          <Alert severity="info" sx={{ mt: 2 }}>
            Duration: {calculateDuration()} days
          </Alert>
        )}
      </Paper>

      <Button
        fullWidth
        variant="contained"
        size="large"
        onClick={handleNext}
        disabled={!bookingData.checkIn || !bookingData.checkOut}
        sx={{
          py: 2,
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #FE456A 0%, #FF6B8B 100%)',
          fontWeight: 'bold',
          fontSize: '1.1rem'
        }}
      >
        Next
      </Button>
    </Box>
  );

  const renderReceipt = () => {
    const { subtotal, tax, total } = calculateTotal();
    
    return (
      <Box>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Booking Summary
        </Typography>

        <Paper elevation={1} sx={{ p: 3, borderRadius: '12px', mb: 3 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Booking Details
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">Property:</Typography>
            <Typography variant="body2" fontWeight="bold">{property.title}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">Location:</Typography>
            <Typography variant="body2">{property.location}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">Check-in:</Typography>
            <Typography variant="body2">{bookingData.checkIn}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">Check-out:</Typography>
            <Typography variant="body2">{bookingData.checkOut}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">Duration:</Typography>
            <Typography variant="body2">{calculateDuration()} days</Typography>
          </Box>
          
          {bookingData.specialNeeds && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" fontWeight="bold">Special Needs:</Typography>
              <Typography variant="body2" color="text.secondary">
                {bookingData.specialNeeds}
              </Typography>
            </Box>
          )}

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Price Breakdown
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">Subtotal ({calculateDuration()} days):</Typography>
            <Typography variant="body2">${subtotal}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">Tax (10%):</Typography>
            <Typography variant="body2">${tax}</Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" fontWeight="bold">Total:</Typography>
            <Typography variant="h6" fontWeight="bold" color="primary">${total}</Typography>
          </Box>
        </Paper>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            size="large"
            onClick={() => setStep(1)}
            sx={{ py: 2, borderRadius: '12px', fontWeight: 'bold' }}
          >
            Back
          </Button>
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleConfirm}
            sx={{
              py: 2,
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #FE456A 0%, #FF6B8B 100%)',
              fontWeight: 'bold',
              fontSize: '1.1rem'
            }}
          >
            Confirm Booking
          </Button>
        </Box>
      </Box>
    );
  };

  if (!property) {
    return null;
  }

  const renderConfirmation = () => (
    <Box sx={{ textAlign: 'center' }}>
      <ConfirmationNumberIcon 
        sx={{ fontSize: 64, color: 'success.main', mb: 2 }} 
      />
      <Typography variant="h4" fontWeight="bold" gutterBottom color="success.main">
        Booking Request Sent!
      </Typography>
      <Typography variant="h6" gutterBottom>
        Your booking request has been submitted
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        The property owner has been notified and will respond to your request soon.
        You will receive an email confirmation once approved.
      </Typography>

      <Paper elevation={1} sx={{ p: 3, borderRadius: '12px', mb: 3, textAlign: 'left' }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Request Details
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">Property:</Typography>
          <Typography variant="body2" fontWeight="bold">{property.title}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">Duration:</Typography>
          <Typography variant="body2" fontWeight="bold">{calculateDuration()} days</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">Total Amount:</Typography>
          <Typography variant="body2" fontWeight="bold" color="primary">${calculateTotal().total}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2">Request ID:</Typography>
          <Typography variant="body2" fontWeight="bold">RM{Date.now()}</Typography>
        </Box>
      </Paper>

      <Button
        fullWidth
        variant="contained"
        size="large"
        onClick={() => navigate('/home')}
        sx={{
          py: 2,
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #FE456A 0%, #FF6B8B 100%)',
          fontWeight: 'bold',
          fontSize: '1.1rem'
        }}
      >
        Back to Home
      </Button>
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <AppBar position="static" elevation={1} sx={{ background: 'white', color: 'text.primary' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => step === 1 ? navigate(-1) : setStep(step - 1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="h1" sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>
            {step === 1 ? 'Select Dates' : step === 2 ? 'Booking Summary' : 'Confirmation'}
          </Typography>
          <Box sx={{ width: 40 }} />
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ py: 3 }}>
        {/* Property Card */}
        {step < 3 && (
          <Card sx={{ borderRadius: '12px', mb: 3 }}>
            <CardContent sx={{ display: 'flex', gap: 2, p: 2 }}>
              <CardMedia
                component="img"
                sx={{ width: 80, height: 80, borderRadius: '8px' }}
                image={property.image}
                alt={property.title}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom>
                  {property.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {property.location}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" color="primary" fontWeight="bold">
                    {property.price}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Rating value={property.rating} readOnly size="small" />
                    <Typography variant="body2" sx={{ ml: 1, fontWeight: 'bold' }}>
                      {property.rating}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Step Content */}
        {step === 1 && renderDateSelection()}
        {step === 2 && renderReceipt()}
        {step === 3 && renderConfirmation()}
      </Container>
    </Box>
  );
}