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
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EditIcon from '@mui/icons-material/Edit';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CleanlinessIcon from '@mui/icons-material/CleaningServices';
import SocialIcon from '@mui/icons-material/Group';
import PetsIcon from '@mui/icons-material/Pets';
import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import ScheduleIcon from '@mui/icons-material/Schedule';

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

      console.log('Saving profile to:', `http://localhost:5000/api/users/${userId}`);
      console.log('Payload:', updatePayload);
      
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatePayload)
      });
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Backend not responding with JSON. Is the server running?');
        alert('Backend server is not running. Please start the backend server (node server.js in backend folder)');
        return;
      }
      
      if (response.ok) {
        const updatedUser = await response.json();
        updatedUser.avatar = avatar;
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        setChangesMade(false);
        alert('Profile updated successfully!');
        navigate('/profile');
      } else {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        alert(errorData.message || 'Failed to save profile');
      }
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

  const LifestyleSection = () => (
    <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: '12px' }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <EmojiEmotionsIcon color="primary" />
        Lifestyle Preferences
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CleanlinessIcon fontSize="small" />
              Cleanliness Level
            </Typography>
            <Slider
              value={userData.cleanliness}
              onChange={(e, value) => handleInputChange('cleanliness', value)}
              min={1}
              max={5}
              marks={[
                { value: 1, label: 'Relaxed' },
                { value: 3, label: 'Balanced' },
                { value: 5, label: 'Very Clean' }
              ]}
              valueLabelDisplay="auto"
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SocialIcon fontSize="small" />
              Social Level
            </Typography>
            <Slider
              value={userData.socialLevel}
              onChange={(e, value) => handleInputChange('socialLevel', value)}
              min={1}
              max={5}
              marks={[
                { value: 1, label: 'Quiet' },
                { value: 3, label: 'Balanced' },
                { value: 5, label: 'Very Social' }
              ]}
              valueLabelDisplay="auto"
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControlLabel
            control={
              <Switch
                checked={userData.smoking}
                onChange={(e) => handleInputChange('smoking', e.target.checked)}
                color="primary"
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SmokeFreeIcon fontSize="small" />
                Smoking Allowed
              </Box>
            }
          />

          <FormControlLabel
            control={
              <Switch
                checked={userData.pets}
                onChange={(e) => handleInputChange('pets', e.target.checked)}
                color="primary"
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PetsIcon fontSize="small" />
                Have Pets
              </Box>
            }
            sx={{ display: 'block', mt: 1 }}
          />

          {!userData.pets && (
            <FormControlLabel
              control={
                <Switch
                  checked={userData.petsTolerance}
                  onChange={(e) => handleInputChange('petsTolerance', e.target.checked)}
                  color="primary"
                />
              }
              label="Okay with roommate's pets"
              sx={{ display: 'block', mt: 1 }}
            />
          )}

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Guest Policy</InputLabel>
            <Select
              value={userData.guests}
              onChange={(e) => handleInputChange('guests', e.target.value)}
              label="Guest Policy"
            >
              <MenuItem value="rare">Rarely have guests</MenuItem>
              <MenuItem value="occasional">Occasional guests</MenuItem>
              <MenuItem value="frequent">Frequently have guests</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );

  const ScheduleSection = () => (
    <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: '12px' }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <ScheduleIcon color="primary" />
        Schedule & Routine
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Sleep Schedule</Typography>
            <Slider
              value={userData.sleepSchedule}
              onChange={(e, value) => handleInputChange('sleepSchedule', value)}
              min={1}
              max={5}
              marks={[
                { value: 1, label: 'Early' },
                { value: 3, label: 'Balanced' },
                { value: 5, label: 'Late' }
              ]}
              valueLabelDisplay="auto"
            />
          </Box>

          <FormControl fullWidth>
            <InputLabel>Work Schedule</InputLabel>
            <Select
              value={userData.workSchedule}
              onChange={(e) => handleInputChange('workSchedule', e.target.value)}
              label="Work Schedule"
            >
              <MenuItem value="9-5">9 AM - 5 PM</MenuItem>
              <MenuItem value="flexible">Flexible Hours</MenuItem>
              <MenuItem value="evenings">Evening Shift</MenuItem>
              <MenuItem value="nights">Night Shift</MenuItem>
              <MenuItem value="student">Student Schedule</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Day Preference</InputLabel>
            <Select
              value={userData.dayPreference}
              onChange={(e) => handleInputChange('dayPreference', e.target.value)}
              label="Day Preference"
            >
              <MenuItem value="morning">Morning Person</MenuItem>
              <MenuItem value="balanced">Balanced</MenuItem>
              <MenuItem value="night">Night Owl</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Weekend Routine</InputLabel>
            <Select
              value={userData.weekendSchedule}
              onChange={(e) => handleInputChange('weekendSchedule', e.target.value)}
              label="Weekend Routine"
            >
              <MenuItem value="home">Mostly at Home</MenuItem>
              <MenuItem value="mixed">Mix of Home & Out</MenuItem>
              <MenuItem value="out">Mostly Out</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );

  const RoommatePreferencesSection = () => (
    <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: '12px' }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Roommate Preferences
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Maximum Budget ($/month)"
            type="number"
            value={userData.maxBudget}
            onChange={(e) => handleInputChange('maxBudget', parseInt(e.target.value))}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Preferred Area"
            value={userData.preferredArea}
            onChange={(e) => handleInputChange('preferredArea', e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Secondary Area Preference"
            value={userData.secondaryArea}
            onChange={(e) => handleInputChange('secondaryArea', e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Lease Duration</InputLabel>
            <Select
              value={userData.leaseDuration}
              onChange={(e) => handleInputChange('leaseDuration', e.target.value)}
              label="Lease Duration"
            >
              <MenuItem value={3}>3 Months</MenuItem>
              <MenuItem value={6}>6 Months</MenuItem>
              <MenuItem value={12}>1 Year</MenuItem>
              <MenuItem value={24}>2 Years</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Room Type</InputLabel>
            <Select
              value={userData.roomType}
              onChange={(e) => handleInputChange('roomType', e.target.value)}
              label="Room Type"
            >
              <MenuItem value="private">Private Room</MenuItem>
              <MenuItem value="shared">Shared Room</MenuItem>
              <MenuItem value="studio">Studio</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Move-in Date"
            type="date"
            value={userData.moveInDate}
            onChange={(e) => handleInputChange('moveInDate', e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Interests & Hobbies</InputLabel>
            <Select
              multiple
              value={userData.interests}
              onChange={handleInterestChange}
              input={<OutlinedInput label="Interests & Hobbies" />}
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
        </Grid>
      </Grid>
    </Paper>
  );

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

        {/* Lifestyle Preferences */}
        <LifestyleSection />

        {/* Schedule & Routine */}
        <ScheduleSection />

        {/* Roommate Preferences */}
        <RoommatePreferencesSection />

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