import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  TextField,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Paper,
  Avatar,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  Slider,
  FormControlLabel,
  Switch,
  Divider
} from '@mui/material';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EditIcon from '@mui/icons-material/Edit';


// Available interests for selection
const availableInterests = [
  'Reading', 'Cooking', 'Gaming', 'Sports', 'Music', 'Movies',
  'Hiking', 'Travel', 'Yoga', 'Art', 'Photography', 'Dancing',
  'Writing', 'Meditation', 'Fitness', 'Gardening', 'Crafts',
  'Technology', 'Science', 'History', 'Languages', 'Volunteering'
];

const initialUserData = {
  name: '',
  username: '',
  email: '',
  dateOfBirth: '',
  occupation: '',
  bio: '',
  phone: '',
  location: '',
  cleanliness: 3,
  socialLevel: 3,
  smoking: false,
  pets: false,
  petsTolerance: true,
  guests: 'occasional',
  sleepSchedule: 3,
  workSchedule: '9-5',
  dayPreference: 'balanced',
  weekendSchedule: 'mixed',
  interests: [],
  maxBudget: 400,
  preferredArea: '',
  secondaryArea: '',
  leaseDuration: 12,
  roomType: 'private',
  moveInDate: ''
};

export default function EditProfile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(initialUserData);
  const [avatar, setAvatar] = useState('/api/placeholder/150/150');
  const [changesMade, setChangesMade] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      setUserData(prev => ({
        ...prev,
        name: user.name || '',
        username: user.name?.split(' ')[0] || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        bio: user.bio || '',
        occupation: user.occupation || '',
        dateOfBirth: user.dateOfBirth || '',
        cleanliness: user.preferences?.cleanliness || 3,
        smoking: user.preferences?.smoking || false,
        pets: user.preferences?.pets || false,
        interests: user.interests || []
      }));
      if (user.avatar && !user.avatar.match(/^[A-Z]{2}$/)) {
        setAvatar(user.avatar);
      }
    }
    setLoading(false);
  }, []);

  const handleInputChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
    setChangesMade(true);
  };

  const handleInterestChange = (event) => {
    const {
      target: { value },
    } = event;
    setUserData(prev => ({
      ...prev,
      interests: typeof value === 'string' ? value.split(',') : value,
    }));
    setChangesMade(true);
  };

  const handleSave = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const token = localStorage.getItem('token');
      const userId = currentUser._id || currentUser.id;
      
      if (!userId) {
        alert('User ID not found. Please log in again.');
        navigate('/login');
        return;
      }

      const updatePayload = {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        location: userData.location,
        bio: userData.bio,
        occupation: userData.occupation,
        interests: userData.interests,
        avatar: avatar,
        preferences: {
          cleanliness: userData.cleanliness,
          socialLevel: userData.socialLevel,
          smoking: userData.smoking,
          pets: userData.pets,
          petsTolerance: userData.petsTolerance,
          guests: userData.guests,
          sleepSchedule: userData.sleepSchedule,
          workSchedule: userData.workSchedule,
          nightOwl: userData.dayPreference === 'night',
          earlyBird: userData.dayPreference === 'morning',
          maxBudget: userData.maxBudget,
          preferredArea: userData.preferredArea,
          roomType: userData.roomType
        }
      };

      const response = await api.put(`/users/${userId}`, updatePayload);
      
      const updatedUser = response.data;
      updatedUser.avatar = avatar;
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setChangesMade(false);
      alert('Profile updated successfully!');
      navigate('/profile');
    } catch (error) {
      console.error('Error saving profile:', error);
      if (error.message.includes('Failed to fetch')) {
        alert('Cannot connect to backend server. Please make sure the backend is running on port 5000.');
      } else {
        alert(`Failed to save profile: ${error.message}`);
      }
    }
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target.result);
        setChangesMade(true);
      };
      reader.readAsDataURL(file);
    }
  };



  return (
    <Box sx={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Header */}
      <AppBar position="static" elevation={1} sx={{ background: 'white', color: 'text.primary' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate('/profile')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="h1" sx={{ flex: 1, fontWeight: 'bold' }}>
            Edit Profile
          </Typography>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!changesMade}
            sx={{ borderRadius: '8px' }}
          >
            Save Changes
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 3 }}>
        {/* Profile Photo Section */}
        <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: '12px', textAlign: 'center' }}>
          <Box sx={{ position: 'relative', display: 'inline-block' }}>
            <Avatar
              src={avatar}
              sx={{
                width: 120,
                height: 120,
                margin: '0 auto 16px',
                border: '4px solid white',
                boxShadow: 2
              }}
            />
            <IconButton
              component="label"
              sx={{
                position: 'absolute',
                bottom: 8,
                right: 8,
                background: 'white',
                boxShadow: 2,
                '&:hover': {
                  background: 'white'
                }
              }}
            >
              <EditIcon fontSize="small" />
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleAvatarUpload}
              />
            </IconButton>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Click the edit icon to upload a new photo
          </Typography>
        </Paper>

        {/* Basic Information */}
        <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: '12px' }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Basic Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                value={userData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Username"
                value={userData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={userData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={userData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                value={userData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Occupation"
                value={userData.occupation}
                onChange={(e) => handleInputChange('occupation', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Bio"
                value={userData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Tell potential roommates about yourself..."
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Interests & Hobbies */}
        <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: '12px' }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Interests & Hobbies
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Select your interests</InputLabel>
            <Select
              multiple
              value={userData.interests}
              onChange={handleInterestChange}
              input={<OutlinedInput label="Select your interests" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
            >
              {availableInterests.map((interest) => (
                <MenuItem key={interest} value={interest}>
                  {interest}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>

        {/* Save Button */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/profile')}
            sx={{ borderRadius: '8px' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!changesMade}
            sx={{ borderRadius: '8px' }}
          >
            Save Changes
          </Button>
        </Box>
      </Container>
    </Box>
  );
}