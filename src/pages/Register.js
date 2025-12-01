import React, { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Paper,
  Divider,
  AppBar,
  Toolbar,
  MenuItem
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    email: 'dammy@gmail.com',
    username: '',
    phone: '',
    location: '',
    password: '',
    agreeTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if all required fields are filled
    if (!formData.email || !formData.username || !formData.phone || !formData.location || !formData.password || !formData.agreeTerms) {
      alert('Please fill in all required fields and agree to terms and conditions.');
      return;
    }
    
    console.log('Registration attempt:', formData);
    // Navigate to home after successful registration
    navigate('/home');
  };

  const isFormValid = formData.email && formData.username && formData.phone && formData.location && formData.password && formData.agreeTerms;

  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Header with time */}
      <AppBar position="static" elevation={0} sx={{ background: 'white' }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'bold' }}>
            09:41
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm">
        <Box sx={{ py: 4 }}>
          <Paper elevation={2} sx={{ p: 4, borderRadius: '16px' }}>
            <Typography variant="h4" component="h1" gutterBottom align="center" fontWeight="bold">
              Register Account
            </Typography>
            
            <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
              Sign in with your email and password or social media to continue
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email *"
                name="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
                sx={{ mb: 2 }}
              />
              
              <TextField
                fullWidth
                label="Username *"
                name="username"
                value={formData.username}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
                sx={{ mb: 2 }}
                placeholder="Username"
              />
              
              <TextField
                fullWidth
                label="Phone Number *"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
                placeholder="e.g., +250 791 234 567"
                sx={{ mb: 2 }}
              />
              
              <TextField
                fullWidth
                select
                label="Current Location *"
                name="location"
                value={formData.location}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
                sx={{ mb: 2 }}
              >
                <MenuItem value="Nyarutarama, Kigali">Nyarutarama, Kigali</MenuItem>
                <MenuItem value="Kacyiru, Kigali">Kacyiru, Kigali</MenuItem>
                <MenuItem value="Kimihurura, Kigali">Kimihurura, Kigali</MenuItem>
                <MenuItem value="Kicukiro, Kigali">Kicukiro, Kigali</MenuItem>
                <MenuItem value="Remera, Kigali">Remera, Kigali</MenuItem>
                <MenuItem value="Gisozi, Kigali">Gisozi, Kigali</MenuItem>
                <MenuItem value="Kiyovu, Kigali">Kiyovu, Kigali</MenuItem>
                <MenuItem value="Gikondo, Kigali">Gikondo, Kigali</MenuItem>
                <MenuItem value="Kibagabaga, Kigali">Kibagabaga, Kigali</MenuItem>
              </TextField>
              
              <TextField
                fullWidth
                label="Password *"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
                sx={{ mb: 2 }}
                placeholder="Password"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    required
                  />
                }
                label="Agree with terms and privacy *"
                sx={{ mb: 3 }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={!isFormValid}
                sx={{ py: 1.5, borderRadius: '8px' }}
              >
                Sign up
              </Button>
            </form>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Or
              </Typography>
            </Divider>

            <Box textAlign="center">
              <Typography variant="body2">
                Already have an account?{' '}
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="primary" component="span" fontWeight="bold">
                    Sign in
                  </Typography>
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}