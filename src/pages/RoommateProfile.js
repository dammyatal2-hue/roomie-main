import React from 'react';
import {
  Box,
  Typography,
  Container,
  Avatar,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Paper,
  Grid,
  Chip,
  Slider,
  FormControlLabel,
  Switch
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MessageIcon from '@mui/icons-material/Message';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import PetsIcon from '@mui/icons-material/Pets';
import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import GroupIcon from '@mui/icons-material/Group';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ScheduleIcon from '@mui/icons-material/Schedule';

// Mock roommate data following EditProfile structure
const roommateData = {
  id: 1,
  name: 'Sarah Johnson',
  username: 'Sarah',
  email: 'sarah.johnson@email.com',
  dateOfBirth: '1999-03-15',
  occupation: 'Marketing Specialist',
  bio: 'Clean, organized professional looking for a compatible roommate. I enjoy cooking, reading, and weekend hiking. Non-smoker, no pets, but pet-friendly.',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  
  // Lifestyle preferences
  cleanliness: 4,
  socialLevel: 3,
  smoking: false,
  pets: false,
  petsTolerance: true,
  guests: 'occasional',
  
  // Schedule preferences
  sleepSchedule: 2,
  workSchedule: '9-5',
  dayPreference: 'morning',
  weekendSchedule: 'mixed',
  
  // Roommate preferences
  interests: ['Cooking', 'Reading', 'Hiking', 'Movies', 'Yoga', 'Travel'],
  maxBudget: 400,
  preferredArea: 'Kibagabaga',
  secondaryArea: 'Kicukiro',
  leaseDuration: 12,
  roomType: 'private',
  moveInDate: '2024-12-01',
  
  // Contact
  phone: '+250 788 123 456'
};

export default function RoommateProfile() {
  const navigate = useNavigate();
  const { roommateId } = useParams();

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
              value={roommateData.cleanliness}
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
              {getSliderLabel(roommateData.cleanliness, 'cleanliness')}
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <GroupIcon fontSize="small" />
              Social Level
            </Typography>
            <Slider
              value={roommateData.socialLevel}
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
              {getSliderLabel(roommateData.socialLevel, 'socialLevel')}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControlLabel
            control={
              <Switch
                checked={roommateData.smoking}
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
                checked={roommateData.pets}
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

          {!roommateData.pets && (
            <FormControlLabel
              control={
                <Switch
                  checked={roommateData.petsTolerance}
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
              {roommateData.guests === 'rare' ? 'Rarely have guests' :
               roommateData.guests === 'occasional' ? 'Occasional guests' :
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
              value={roommateData.sleepSchedule}
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
              {getSliderLabel(roommateData.sleepSchedule, 'sleepSchedule')}
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2" fontWeight="bold">Work Schedule</Typography>
            <Typography variant="body2" color="text.secondary">
              {roommateData.workSchedule === '9-5' ? '9 AM - 5 PM' :
               roommateData.workSchedule === 'flexible' ? 'Flexible Hours' :
               roommateData.workSchedule === 'evenings' ? 'Evening Shift' :
               roommateData.workSchedule === 'nights' ? 'Night Shift' :
               'Student Schedule'}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" fontWeight="bold">Day Preference</Typography>
            <Typography variant="body2" color="text.secondary">
              {roommateData.dayPreference === 'morning' ? 'Morning Person' :
               roommateData.dayPreference === 'balanced' ? 'Balanced' :
               'Night Owl'}
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2" fontWeight="bold">Weekend Routine</Typography>
            <Typography variant="body2" color="text.secondary">
              {roommateData.weekendSchedule === 'home' ? 'Mostly at Home' :
               roommateData.weekendSchedule === 'mixed' ? 'Mix of Home & Out' :
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
              ${roommateData.maxBudget}/month
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" fontWeight="bold">Preferred Area</Typography>
            <Typography variant="body2" color="text.secondary">
              {roommateData.preferredArea}
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2" fontWeight="bold">Secondary Area Preference</Typography>
            <Typography variant="body2" color="text.secondary">
              {roommateData.secondaryArea}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" fontWeight="bold">Lease Duration</Typography>
            <Typography variant="body2" color="text.secondary">
              {roommateData.leaseDuration === 3 ? '3 Months' :
               roommateData.leaseDuration === 6 ? '6 Months' :
               roommateData.leaseDuration === 12 ? '1 Year' :
               '2 Years'}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" fontWeight="bold">Room Type</Typography>
            <Typography variant="body2" color="text.secondary">
              {roommateData.roomType === 'private' ? 'Private Room' :
               roommateData.roomType === 'shared' ? 'Shared Room' :
               'Studio'}
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2" fontWeight="bold">Move-in Date</Typography>
            <Typography variant="body2" color="text.secondary">
              {new Date(roommateData.moveInDate).toLocaleDateString()}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body2" fontWeight="bold" gutterBottom>
            Interests & Hobbies
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {roommateData.interests.map((interest) => (
              <Chip key={interest} label={interest} size="small" />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );

  return (
    <Box sx={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Header */}
      <AppBar position="static" elevation={1} sx={{ background: 'white', color: 'text.primary' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate('/roommate-matching')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="h1" sx={{ flex: 1, fontWeight: 'bold' }}>
            Roommate Profile
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 3 }}>
        {/* Profile Photo Section */}
        <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: '12px', textAlign: 'center' }}>
          <Avatar
            src={roommateData.avatar}
            sx={{
              width: 120,
              height: 120,
              margin: '0 auto 16px',
              border: '4px solid white',
              boxShadow: 2
            }}
          />
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {roommateData.name}
          </Typography>
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
                {roommateData.username}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" fontWeight="bold">Email</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {roommateData.email}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" fontWeight="bold">Phone</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {roommateData.phone}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" fontWeight="bold">Occupation</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {roommateData.occupation}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" fontWeight="bold">Bio</Typography>
              <Typography variant="body2" color="text.secondary">
                {roommateData.bio}
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

        {/* Match Button */}
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={() => {
            alert(`Match request sent to ${roommateData.name}!`);
            navigate('/roommate-matching');
          }}
          sx={{
            py: 2,
            mt: 3,
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #FE456A 0%, #FF6B8B 100%)',
            fontWeight: 'bold',
            fontSize: '1.1rem'
          }}
        >
          Match
        </Button>
      </Container>
    </Box>
  );
}