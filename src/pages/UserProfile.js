import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Avatar,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Grid,
  Chip,
  Slider,
  FormControlLabel,
  Switch
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MessageIcon from '@mui/icons-material/Message';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import PetsIcon from '@mui/icons-material/Pets';
import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import GroupIcon from '@mui/icons-material/Group';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ScheduleIcon from '@mui/icons-material/Schedule';

// Mock user data following EditProfile structure
const userData = {
  id: 'john-doe-123',
  name: 'John Doe',
  username: 'JohnD',
  email: 'john.doe@email.com',
  dateOfBirth: '1995-08-12',
  occupation: 'Software Engineer',
  bio: 'Professional software engineer looking for a comfortable place to stay. Clean, respectful, and quiet tenant with excellent references.',
  
  // Lifestyle preferences
  cleanliness: 5,
  socialLevel: 2,
  smoking: false,
  pets: false,
  petsTolerance: true,
  guests: 'rare',
  
  // Schedule preferences
  sleepSchedule: 2,
  workSchedule: '9-5',
  dayPreference: 'morning',
  weekendSchedule: 'home',
  
  // Roommate preferences
  interests: ['Technology', 'Reading', 'Hiking', 'Coffee', 'Gaming'],
  maxBudget: 500,
  preferredArea: 'Nyarutarama',
  secondaryArea: 'Kimihurura',
  leaseDuration: 6,
  roomType: 'private',
  moveInDate: '2024-02-15',
  
  // Booking request details
  bookingRequest: {
    property: 'Kigali Heights Apartment',
    checkIn: '2024-02-15',
    checkOut: '2024-03-15',
    duration: '1 month',
    specialNeeds: 'Need parking space for my car',
    totalAmount: '$450.00'
  }
};

export default function UserProfile() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [isApproved, setIsApproved] = useState(false);

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getSliderLabel = (value, type) => {
    const labels = {
      cleanliness: { 1: 'Relaxed', 3: 'Balanced', 5: 'Very Clean' },
      socialLevel: { 1: 'Quiet', 3: 'Balanced', 5: 'Very Social' },
      sleepSchedule: { 1: 'Early', 3: 'Balanced', 5: 'Late' }
    };
    return labels[type][value] || 'Balanced';
  };

  const handleApprove = () => {
    setIsApproved(true);
    alert(`Booking request approved for ${userData.name}! Contact details are now available.`);
  };

  const handleDecline = () => {
    alert(`Booking request declined for ${userData.name}.`);
    navigate('/notifications');
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
              <CleaningServicesIcon fontSize="small" />
              Cleanliness Level
            </Typography>
            <Slider
              value={userData.cleanliness}
              min={1}
              max={5}
              marks={[
                { value: 1, label: 'Relaxed' },
                { value: 3, label: 'Balanced' },
                { value: 5, label: 'Very Clean' }
              ]}
              valueLabelDisplay="auto"
              disabled
            />
            <Typography variant="body2" color="text.secondary" textAlign="center">
              {getSliderLabel(userData.cleanliness, 'cleanliness')}
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <GroupIcon fontSize="small" />
              Social Level
            </Typography>
            <Slider
              value={userData.socialLevel}
              min={1}
              max={5}
              marks={[
                { value: 1, label: 'Quiet' },
                { value: 3, label: 'Balanced' },
                { value: 5, label: 'Very Social' }
              ]}
              valueLabelDisplay="auto"
              disabled
            />
            <Typography variant="body2" color="text.secondary" textAlign="center">
              {getSliderLabel(userData.socialLevel, 'socialLevel')}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControlLabel
            control={
              <Switch
                checked={userData.smoking}
                disabled
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
                disabled
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
                  disabled
                  color="primary"
                />
              }
              label="Okay with roommate's pets"
              sx={{ display: 'block', mt: 1 }}
            />
          )}

          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" fontWeight="bold">Guest Policy</Typography>
            <Typography variant="body2" color="text.secondary">
              {userData.guests === 'rare' ? 'Rarely have guests' :
               userData.guests === 'occasional' ? 'Occasional guests' :
               'Frequently have guests'}
            </Typography>
          </Box>
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
              min={1}
              max={5}
              marks={[
                { value: 1, label: 'Early' },
                { value: 3, label: 'Balanced' },
                { value: 5, label: 'Late' }
              ]}
              valueLabelDisplay="auto"
              disabled
            />
            <Typography variant="body2" color="text.secondary" textAlign="center">
              {getSliderLabel(userData.sleepSchedule, 'sleepSchedule')}
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2" fontWeight="bold">Work Schedule</Typography>
            <Typography variant="body2" color="text.secondary">
              {userData.workSchedule === '9-5' ? '9 AM - 5 PM' :
               userData.workSchedule === 'flexible' ? 'Flexible Hours' :
               userData.workSchedule === 'evenings' ? 'Evening Shift' :
               userData.workSchedule === 'nights' ? 'Night Shift' :
               'Student Schedule'}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" fontWeight="bold">Day Preference</Typography>
            <Typography variant="body2" color="text.secondary">
              {userData.dayPreference === 'morning' ? 'Morning Person' :
               userData.dayPreference === 'balanced' ? 'Balanced' :
               'Night Owl'}
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2" fontWeight="bold">Weekend Routine</Typography>
            <Typography variant="body2" color="text.secondary">
              {userData.weekendSchedule === 'home' ? 'Mostly at Home' :
               userData.weekendSchedule === 'mixed' ? 'Mix of Home & Out' :
               'Mostly Out'}
            </Typography>
          </Box>
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
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" fontWeight="bold">Maximum Budget</Typography>
            <Typography variant="body2" color="text.secondary">
              ${userData.maxBudget}/month
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" fontWeight="bold">Preferred Area</Typography>
            <Typography variant="body2" color="text.secondary">
              {userData.preferredArea}
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2" fontWeight="bold">Secondary Area Preference</Typography>
            <Typography variant="body2" color="text.secondary">
              {userData.secondaryArea}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" fontWeight="bold">Lease Duration</Typography>
            <Typography variant="body2" color="text.secondary">
              {userData.leaseDuration === 3 ? '3 Months' :
               userData.leaseDuration === 6 ? '6 Months' :
               userData.leaseDuration === 12 ? '1 Year' :
               '2 Years'}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" fontWeight="bold">Room Type</Typography>
            <Typography variant="body2" color="text.secondary">
              {userData.roomType === 'private' ? 'Private Room' :
               userData.roomType === 'shared' ? 'Shared Room' :
               'Studio'}
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2" fontWeight="bold">Move-in Date</Typography>
            <Typography variant="body2" color="text.secondary">
              {new Date(userData.moveInDate).toLocaleDateString()}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body2" fontWeight="bold" gutterBottom>
            Interests & Hobbies
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {userData.interests.map((interest) => (
              <Chip key={interest} label={interest} size="small" />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );

  return (
    <Box sx={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <AppBar position="static" elevation={1} sx={{ background: 'white', color: 'text.primary' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="h1" sx={{ flex: 1, fontWeight: 'bold' }}>
            User Profile
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 3 }}>
        {/* Profile Photo Section */}
        <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: '12px', textAlign: 'center' }}>
          <Avatar
            sx={{
              width: 120,
              height: 120,
              margin: '0 auto 16px',
              border: '4px solid white',
              boxShadow: 2,
              background: 'linear-gradient(135deg, #FE456A 0%, #FF6B8B 100%)',
              fontSize: '2.5rem',
              fontWeight: 'bold'
            }}
          >
            {userData.name.split(' ').map(n => n[0]).join('')}
          </Avatar>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {userData.name}
          </Typography>
        </Paper>

        {/* Booking Request */}
        <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: '12px' }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
            📋 Booking Request
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">Property</Typography>
              <Typography variant="body1" fontWeight="bold">{userData.bookingRequest.property}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">Duration</Typography>
              <Typography variant="body1" fontWeight="bold">{userData.bookingRequest.duration}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">Check-in</Typography>
              <Typography variant="body1">{userData.bookingRequest.checkIn}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">Check-out</Typography>
              <Typography variant="body1">{userData.bookingRequest.checkOut}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">Special Needs</Typography>
              <Typography variant="body1">{userData.bookingRequest.specialNeeds}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">Total Amount</Typography>
              <Typography variant="h6" color="primary" fontWeight="bold">{userData.bookingRequest.totalAmount}</Typography>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<CloseIcon />}
              onClick={handleDecline}
              sx={{ py: 2, borderRadius: '12px', color: 'error.main', borderColor: 'error.main', fontWeight: 'bold' }}
            >
              Decline
            </Button>
            <Button
              fullWidth
              variant="contained"
              startIcon={<CheckIcon />}
              onClick={handleApprove}
              sx={{ 
                py: 2,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                fontWeight: 'bold'
              }}
            >
              Approve
            </Button>
          </Box>
        </Paper>

        {/* Basic Information */}
        <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: '12px' }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Basic Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" fontWeight="bold">Username</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {userData.username}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" fontWeight="bold">Email</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {isApproved ? userData.email : 'Hidden until approved'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" fontWeight="bold">Phone</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {isApproved ? userData.phone : 'Hidden until approved'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" fontWeight="bold">Occupation</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {userData.occupation}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" fontWeight="bold">Bio</Typography>
              <Typography variant="body2" color="text.secondary">
                {userData.bio}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Lifestyle Preferences */}
        <LifestyleSection />

        {/* Schedule & Routine */}
        <ScheduleSection />

        {/* Roommate Preferences */}
        <RoommatePreferencesSection />
      </Container>
    </Box>
  );
}