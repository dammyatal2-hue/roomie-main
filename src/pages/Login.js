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
  Toolbar
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    email: 'dammy@gmail.com',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    
    // Mock login - set different users based on email
    let user;
    if (formData.email === 'john@email.com') {
      user = { id: 'user1', name: 'John Doe', email: 'john@email.com', type: 'Tenant', avatar: 'JD' };
    } else if (formData.email === 'sarah@email.com') {
      user = { id: 'user2', name: 'Sarah Johnson', email: 'sarah@email.com', type: 'Property Owner', avatar: 'SJ' };
    } else if (formData.email === 'alex@email.com') {
      user = { id: 'user3', name: 'Alex Chen', email: 'alex@email.com', type: 'Roommate Seeker', avatar: 'AC' };
    } else {
      user = { id: 'user1', name: 'John Doe', email: 'john@email.com', type: 'Tenant', avatar: 'JD' };
    }
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    navigate('/home');
  };

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
              Welcome Back !
            </Typography>
            
            <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 2 }}>
              Sign in with your email and password or social media to continue
            </Typography>
            
            <Box sx={{ mb: 3, p: 2, bgcolor: 'info.light', borderRadius: '8px' }}>
              <Typography variant="body2" fontWeight="bold" gutterBottom>
                Test Accounts:
              </Typography>
              <Typography variant="caption" display="block">
                • john@email.com - Tenant (makes bookings)
              </Typography>
              <Typography variant="caption" display="block">
                • sarah@email.com - Property Owner (receives requests)
              </Typography>
              <Typography variant="caption" display="block">
                • alex@email.com - Roommate Seeker (matches)
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                sx={{ mb: 2 }}
              />
              
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                error={!!error}
                helperText={error}
                sx={{ mb: 2 }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                    />
                  }
                  label="Remember me"
                />
                <Link to="/reset-password" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="primary">
                    Forgot password?
                  </Typography>
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 2, py: 1.5, borderRadius: '8px' }}
              >
                Sign in
              </Button>
            </form>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Or
              </Typography>
            </Divider>

            <Box textAlign="center">
              <Typography variant="body2">
                Don't have an account?{' '}
                <Link to="/register" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="primary" component="span" fontWeight="bold">
                    Sign up
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