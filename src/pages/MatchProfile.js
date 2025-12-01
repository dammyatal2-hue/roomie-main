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
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import MessageIcon from '@mui/icons-material/Message';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import PetsIcon from '@mui/icons-material/Pets';
import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import GroupIcon from '@mui/icons-material/Group';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ScheduleIcon from '@mui/icons-material/Schedule';

// Mock match data
const matchData = {
  id: 'sarah-johnson-456',
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
  
  // Contact (hidden until approved)
  phone: '+250 788 123 456'
};

export default function MatchProfile() {
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
    alert(`Match approved! You can now contact ${matchData.name}.`);
  };

  const handleDecline = () => {
    alert(`Match declined with ${matchData.name}.`);
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
              value={matchData.cleanliness}
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
              {getSliderLabel(matchData.cleanliness, 'cleanliness')}
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <GroupIcon fontSize="small" />
              Social Level
            </Typography>
            <Slider
              value={matchData.socialLevel}
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
              {getSliderLabel(matchData.socialLevel, 'socialLevel')}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControlLabel
            control={
              <Switch
                checked={matchData.smoking}
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
                checked={matchData.pets}
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

          {!matchData.pets && (
            <FormControlLabel
              control={
                <Switch
                  checked={matchData.petsTolerance}
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
              {matchData.guests === 'rare' ? 'Rarely have guests' :
               matchData.guests === 'occasional' ? 'Occasional guests' :
               'Frequently have guests'}
            </Typography>
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
          <IconButton edge="start" color="inherit" onClick={() => navigate('/notifications')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="h1" sx={{ flex: 1, fontWeight: 'bold' }}>
            Match Request
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 3 }}>
        {/* Profile Photo Section */}
        <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: '12px', textAlign: 'center' }}>
          <Avatar
            src={matchData.avatar}
            sx={{
              width: 120,
              height: 120,
              margin: '0 auto 16px',
              border: '4px solid white',
              boxShadow: 2
            }}
          />
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {matchData.name}
          </Typography>
          <Typography variant="body1" color="primary" fontWeight="bold">
            Wants to match with you as a roommate
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
                {matchData.username}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" fontWeight="bold">Email</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {isApproved ? matchData.email : 'Hidden until approved'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" fontWeight="bold">Phone</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {isApproved ? matchData.phone : 'Hidden until approved'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" fontWeight="bold">Occupation</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {matchData.occupation}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" fontWeight="bold">Bio</Typography>
              <Typography variant="body2" color="text.secondary">
                {matchData.bio}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Lifestyle Preferences */}
        <LifestyleSection />

        {/* Interests */}
        <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: '12px' }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Interests & Hobbies
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {matchData.interests.map((interest) => (
              <Chip key={interest} label={interest} size="small" />
            ))}
          </Box>
        </Paper>

        {/* Action Buttons */}
        {!isApproved ? (
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
              Approve Match
            </Button>
          </Box>
        ) : (
          <Box>
            <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: '12px', textAlign: 'center', bgcolor: 'success.light' }}>
              <Typography variant="h6" fontWeight="bold" color="success.dark" gutterBottom>
                Match Approved! 🎉
              </Typography>
              <Typography variant="body2" color="success.dark">
                You can now contact {matchData.name} using the details below
              </Typography>
            </Paper>

            {/* Contact Information */}
            <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: '12px' }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Contact Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" fontWeight="bold">Email</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {matchData.email}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" fontWeight="bold">Phone</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {matchData.phone}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>

            {/* Contact Buttons */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                startIcon={<MessageIcon />}
                sx={{
                  flex: 1,
                  py: 2,
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #FE456A 0%, #FF6B8B 100%)',
                  fontWeight: 'bold'
                }}
              >
                Message
              </Button>
              <Button
                variant="outlined"
                startIcon={<CallIcon />}
                sx={{ flex: 1, py: 2, borderRadius: '12px', fontWeight: 'bold' }}
              >
                Call
              </Button>
              <Button
                variant="outlined"
                startIcon={<EmailIcon />}
                sx={{ flex: 1, py: 2, borderRadius: '12px', fontWeight: 'bold' }}
              >
                Email
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}