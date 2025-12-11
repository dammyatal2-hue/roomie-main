import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Grid,
  Chip,
  Slider,
  Switch,
  FormControlLabel,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import api from '../services/api';

const lifestyleOptions = {
  dailyRoutine: [
    { value: 'early_bird', label: 'Early Bird', icon: '🐦' },
    { value: 'night_owl', label: 'Night Owl', icon: '🌙' },
    { value: 'flexible', label: 'Flexible', icon: '😎' }
  ],
  cleanliness: [
    { value: 'very_tidy', label: 'Very tidy', icon: '🧹' },
    { value: 'moderate', label: 'Moderate', icon: '🙂' },
    { value: 'relaxed', label: 'A bit messy', icon: '😅' }
  ],
  socialEnergy: [
    { value: 'outgoing', label: 'Outgoing', icon: '🥳' },
    { value: 'introverted', label: 'Introverted', icon: '🧘' },
    { value: 'balanced', label: 'Balanced', icon: '😊' }
  ],
  noisePreference: [
    { value: 'quiet', label: 'Quiet home', icon: '🔇' },
    { value: 'moderate', label: 'Moderate noise', icon: '🔉' },
    { value: 'loud', label: 'Loud is fine', icon: '🔊' }
  ],
  workLifestyle: [
    { value: 'wfh', label: 'Work from home', icon: '🏠' },
    { value: 'office', label: 'Goes out daily', icon: '🚇' },
    { value: 'hybrid', label: 'Hybrid', icon: '🔁' }
  ],
  visitors: [
    { value: 'no_visitors', label: 'No visitors', icon: '🚫' },
    { value: 'occasional', label: 'Occasional visitors', icon: '👥' },
    { value: 'frequent', label: 'Frequent visitors', icon: '🎉' }
  ]
};

const dishesAttitude = [
  { value: 'hate', label: 'Hate it', icon: '🤢' },
  { value: 'happens', label: 'It happens', icon: '😐' },
  { value: 'fine', label: "Won't kill me", icon: '😂' }
];

const weekendVibe = [
  { value: 'rest', label: 'Rest', icon: '🛌' },
  { value: 'outside', label: 'Outside', icon: '🏖️' },
  { value: 'party', label: 'Party', icon: '🥳' }
];

const morningEnergy = [
  { value: 'slow', label: 'Slow', icon: '😴' },
  { value: 'normal', label: 'Normal', icon: '🙂' },
  { value: 'hyper', label: 'Hyper', icon: '⚡' }
];

const vibesBadges = [
  { value: 'minimalist', label: 'Minimalist', icon: '✨' },
  { value: 'fashionista', label: 'Fashionista', icon: '👗' },
  { value: 'gamer', label: 'Gamer', icon: '🎮' },
  { value: 'tech', label: 'Tech bro', icon: '💻' },
  { value: 'gym', label: 'Gym life', icon: '💪' },
  { value: 'entrepreneur', label: 'Entrepreneur', icon: '🚀' },
  { value: 'foodie', label: 'Foodie', icon: '🍕' },
  { value: 'music', label: 'Music Lover', icon: '🎶' },
  { value: 'eco', label: 'Eco-Friendly', icon: '🌿' },
  { value: 'student', label: 'Student', icon: '📚' },
  { value: 'cook', label: 'Kitchen Lover', icon: '🧑‍🍳' },
  { value: 'adventurous', label: 'Adventurous', icon: '🏔️' }
];

export default function LifestylePreferences() {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState({
    dailyRoutine: '',
    cleanliness: '',
    socialEnergy: '',
    noisePreference: '',
    workLifestyle: '',
    visitors: '',
    dishesAttitude: '',
    weekendVibe: '',
    morningEnergy: '',
    cleanlinessLevel: 50,
    noiseLevel: 50,
    socialLevel: 50,
    smokingTolerance: 0,
    petTolerance: 50,
    isSmoker: false,
    hasPets: false,
    comfortableWithSmokers: false,
    okayWithPets: true,
    shareGroceries: false,
    shareCooking: false,
    noSmokers: false,
    noPets: false,
    noFrequentVisitors: false,
    genderPreference: 'any',
    vibes: []
  });

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      if (user && (user._id || user.id)) {
        const userId = user._id || user.id;
        const response = await api.get(`/users/${userId}`);
        if (response.data.preferences) {
          setPreferences({ ...preferences, ...response.data.preferences });
        }
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    }
  };

  const handleOptionSelect = (category, value) => {
    setPreferences({ ...preferences, [category]: value });
  };

  const handleSliderChange = (field, value) => {
    setPreferences({ ...preferences, [field]: value });
  };

  const handleToggle = (field) => {
    setPreferences({ ...preferences, [field]: !preferences[field] });
  };

  const handleVibeToggle = (vibe) => {
    const vibes = preferences.vibes || [];
    if (vibes.includes(vibe)) {
      setPreferences({ ...preferences, vibes: vibes.filter(v => v !== vibe) });
    } else {
      setPreferences({ ...preferences, vibes: [...vibes, vibe] });
    }
  };

  const handleSave = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      if (user && (user._id || user.id)) {
        const userId = user._id || user.id;
        await api.patch(`/users/${userId}/preferences`, preferences);
        alert('Preferences saved successfully!');
        navigate('/profile');
      }
    } catch (error) {
      console.error('Error saving preferences:', error);
      alert('Failed to save preferences');
    }
  };

  const OptionCard = ({ options, selected, onSelect }) => (
    <Grid container spacing={1}>
      {options.map((option) => (
        <Grid item xs={4} key={option.value}>
          <Paper
            elevation={selected === option.value ? 3 : 0}
            sx={{
              p: 2,
              textAlign: 'center',
              cursor: 'pointer',
              border: selected === option.value ? '2px solid #FE456A' : '2px solid #eee',
              background: selected === option.value ? '#FFF5F7' : 'white',
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 2
              }
            }}
            onClick={() => onSelect(option.value)}
          >
            <Typography variant="h4" sx={{ mb: 1 }}>{option.icon}</Typography>
            <Typography variant="body2" fontWeight={selected === option.value ? 'bold' : 'normal'}>
              {option.label}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box sx={{ minHeight: '100vh', background: '#f5f5f5', pb: 4 }}>
      <AppBar position="static" elevation={1} sx={{ background: 'white', color: 'text.primary' }}>
        <Toolbar>
          <IconButton edge="start" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: 1, textAlign: 'center', mr: 6 }}>
            Lifestyle Preferences
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 3 }}>
        <Paper elevation={1} sx={{ p: 3, mb: 2, borderRadius: '12px', textAlign: 'center' }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            ✨ Tell us your lifestyle
          </Typography>
          <Typography variant="body2" color="text.secondary">
            So we can match you with your perfect roommate
          </Typography>
        </Paper>

        {/* SECTION 1: Living Habits */}
        <Paper elevation={1} sx={{ p: 3, mb: 2, borderRadius: '12px' }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            🏠 Living Habits
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              ✨ Daily Routine
            </Typography>
            <OptionCard
              options={lifestyleOptions.dailyRoutine}
              selected={preferences.dailyRoutine}
              onSelect={(value) => handleOptionSelect('dailyRoutine', value)}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              ✨ Cleanliness Level
            </Typography>
            <OptionCard
              options={lifestyleOptions.cleanliness}
              selected={preferences.cleanliness}
              onSelect={(value) => handleOptionSelect('cleanliness', value)}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              ✨ Social Energy
            </Typography>
            <OptionCard
              options={lifestyleOptions.socialEnergy}
              selected={preferences.socialEnergy}
              onSelect={(value) => handleOptionSelect('socialEnergy', value)}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              ✨ Noise Preference
            </Typography>
            <OptionCard
              options={lifestyleOptions.noisePreference}
              selected={preferences.noisePreference}
              onSelect={(value) => handleOptionSelect('noisePreference', value)}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              ✨ Work Lifestyle
            </Typography>
            <OptionCard
              options={lifestyleOptions.workLifestyle}
              selected={preferences.workLifestyle}
              onSelect={(value) => handleOptionSelect('workLifestyle', value)}
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              ✨ Visitors
            </Typography>
            <OptionCard
              options={lifestyleOptions.visitors}
              selected={preferences.visitors}
              onSelect={(value) => handleOptionSelect('visitors', value)}
            />
          </Box>
        </Paper>

        {/* SECTION 2: Sliders */}
        <Paper elevation={1} sx={{ p: 3, mb: 2, borderRadius: '12px' }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            🎛️ Fine-tune Your Preferences
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" gutterBottom>Cleanliness</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="caption">Relaxed</Typography>
              <Slider
                value={preferences.cleanlinessLevel}
                onChange={(e, value) => handleSliderChange('cleanlinessLevel', value)}
                sx={{ flex: 1, color: '#FE456A' }}
              />
              <Typography variant="caption">Very Clean</Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" gutterBottom>Noise Tolerance</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="caption">Quiet</Typography>
              <Slider
                value={preferences.noiseLevel}
                onChange={(e, value) => handleSliderChange('noiseLevel', value)}
                sx={{ flex: 1, color: '#FE456A' }}
              />
              <Typography variant="caption">Loud</Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" gutterBottom>Social Energy</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="caption">Introverted</Typography>
              <Slider
                value={preferences.socialLevel}
                onChange={(e, value) => handleSliderChange('socialLevel', value)}
                sx={{ flex: 1, color: '#FE456A' }}
              />
              <Typography variant="caption">Extroverted</Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" gutterBottom>Pet Tolerance</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="caption">No pets</Typography>
              <Slider
                value={preferences.petTolerance}
                onChange={(e, value) => handleSliderChange('petTolerance', value)}
                sx={{ flex: 1, color: '#FE456A' }}
              />
              <Typography variant="caption">Love pets</Typography>
            </Box>
          </Box>
        </Paper>

        {/* SECTION 3: Real-Life Behavior */}
        <Paper elevation={1} sx={{ p: 3, mb: 2, borderRadius: '12px' }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            👀 Choose Your Vibe
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              How do you feel about dishes in the sink?
            </Typography>
            <OptionCard
              options={dishesAttitude}
              selected={preferences.dishesAttitude}
              onSelect={(value) => handleOptionSelect('dishesAttitude', value)}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              Best weekend vibe?
            </Typography>
            <OptionCard
              options={weekendVibe}
              selected={preferences.weekendVibe}
              onSelect={(value) => handleOptionSelect('weekendVibe', value)}
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              What's your morning energy?
            </Typography>
            <OptionCard
              options={morningEnergy}
              selected={preferences.morningEnergy}
              onSelect={(value) => handleOptionSelect('morningEnergy', value)}
            />
          </Box>
        </Paper>

        {/* SECTION 4: Quick Toggles */}
        <Paper elevation={1} sx={{ p: 3, mb: 2, borderRadius: '12px' }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            🧩 Quick Questions
          </Typography>

          <FormControlLabel
            control={<Switch checked={preferences.isSmoker} onChange={() => handleToggle('isSmoker')} color="primary" />}
            label="Do you smoke?"
          />
          <FormControlLabel
            control={<Switch checked={preferences.comfortableWithSmokers} onChange={() => handleToggle('comfortableWithSmokers')} color="primary" />}
            label="Comfortable with smokers?"
          />
          <FormControlLabel
            control={<Switch checked={preferences.hasPets} onChange={() => handleToggle('hasPets')} color="primary" />}
            label="Do you have pets?"
          />
          <FormControlLabel
            control={<Switch checked={preferences.okayWithPets} onChange={() => handleToggle('okayWithPets')} color="primary" />}
            label="Okay with pets?"
          />
          <FormControlLabel
            control={<Switch checked={preferences.shareGroceries} onChange={() => handleToggle('shareGroceries')} color="primary" />}
            label="Share groceries?"
          />
          <FormControlLabel
            control={<Switch checked={preferences.shareCooking} onChange={() => handleToggle('shareCooking')} color="primary" />}
            label="Share cooking?"
          />
        </Paper>

        {/* SECTION 5: Dealbreakers */}
        <Paper elevation={1} sx={{ p: 3, mb: 2, borderRadius: '12px' }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            🚫 Dealbreakers
          </Typography>

          <FormControlLabel
            control={<Switch checked={preferences.noSmokers} onChange={() => handleToggle('noSmokers')} color="error" />}
            label="🚫 No smokers"
          />
          <FormControlLabel
            control={<Switch checked={preferences.noPets} onChange={() => handleToggle('noPets')} color="error" />}
            label="🚫 No pets"
          />
          <FormControlLabel
            control={<Switch checked={preferences.noFrequentVisitors} onChange={() => handleToggle('noFrequentVisitors')} color="error" />}
            label="🚫 No frequent visitors"
          />
        </Paper>

        {/* SECTION 6: Vibes Badges */}
        <Paper elevation={1} sx={{ p: 3, mb: 2, borderRadius: '12px' }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            🎨 Your Vibes
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Select all that apply
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {vibesBadges.map((badge) => (
              <Chip
                key={badge.value}
                label={`${badge.icon} ${badge.label}`}
                onClick={() => handleVibeToggle(badge.value)}
                color={preferences.vibes?.includes(badge.value) ? 'primary' : 'default'}
                variant={preferences.vibes?.includes(badge.value) ? 'filled' : 'outlined'}
                sx={{
                  fontWeight: preferences.vibes?.includes(badge.value) ? 'bold' : 'normal',
                  cursor: 'pointer'
                }}
              />
            ))}
          </Box>
        </Paper>

        {/* Save Button */}
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleSave}
          sx={{
            py: 2,
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #FE456A 0%, #FF6B8B 100%)',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            '&:hover': {
              background: 'linear-gradient(135deg, #D32F4E 0%, #FE456A 100%)',
            }
          }}
        >
          Save Preferences
        </Button>
      </Container>
    </Box>
  );
}
