import React from 'react';
import { Box, Typography, Paper, Grid, Chip } from '@mui/material';

const lifestyleLabels = {
  dailyRoutine: { early_bird: '🐦 Early Bird', night_owl: '🌙 Night Owl', flexible: '😎 Flexible' },
  cleanliness: { very_tidy: '🧹 Very tidy', moderate: '🙂 Moderate', relaxed: '😅 A bit messy' },
  socialEnergy: { outgoing: '🥳 Outgoing', introverted: '🧘 Introverted', balanced: '😊 Balanced' },
  noisePreference: { quiet: '🔇 Quiet home', moderate: '🔉 Moderate noise', loud: '🔊 Loud is fine' },
  workLifestyle: { wfh: '🏠 Work from home', office: '🚇 Goes out daily', hybrid: '🔁 Hybrid' },
  visitors: { no_visitors: '🚫 No visitors', occasional: '👥 Occasional visitors', frequent: '🎉 Frequent visitors' },
  dishesAttitude: { hate: '🤢 Hate it', happens: '😐 It happens', fine: '😂 Won\'t kill me' },
  weekendVibe: { rest: '🛌 Rest', outside: '🏖️ Outside', party: '🥳 Party' },
  morningEnergy: { slow: '😴 Slow', normal: '🙂 Normal', hyper: '⚡ Hyper' }
};

const vibeLabels = {
  minimalist: '✨ Minimalist',
  fashionista: '👗 Fashionista',
  gamer: '🎮 Gamer',
  tech: '💻 Tech bro',
  gym: '💪 Gym life',
  entrepreneur: '🚀 Entrepreneur',
  foodie: '🍕 Foodie',
  music: '🎶 Music Lover',
  eco: '🌿 Eco-Friendly',
  student: '📚 Student',
  cook: '🧑🍳 Kitchen Lover',
  adventurous: '🏔️ Adventurous'
};

export default function LifestyleDisplay({ preferences }) {
  if (!preferences) return null;

  return (
    <Paper elevation={1} sx={{ p: 3, mb: 2, borderRadius: '12px' }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        ✨ Lifestyle Preferences
      </Typography>

      <Grid container spacing={2}>
        {/* Living Habits */}
        {preferences.dailyRoutine && (
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">Daily Routine</Typography>
            <Typography variant="body1">{lifestyleLabels.dailyRoutine[preferences.dailyRoutine]}</Typography>
          </Grid>
        )}
        
        {preferences.cleanliness && (
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">Cleanliness</Typography>
            <Typography variant="body1">{lifestyleLabels.cleanliness[preferences.cleanliness]}</Typography>
          </Grid>
        )}
        
        {preferences.socialEnergy && (
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">Social Energy</Typography>
            <Typography variant="body1">{lifestyleLabels.socialEnergy[preferences.socialEnergy]}</Typography>
          </Grid>
        )}
        
        {preferences.noisePreference && (
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">Noise Preference</Typography>
            <Typography variant="body1">{lifestyleLabels.noisePreference[preferences.noisePreference]}</Typography>
          </Grid>
        )}
        
        {preferences.workLifestyle && (
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">Work Lifestyle</Typography>
            <Typography variant="body1">{lifestyleLabels.workLifestyle[preferences.workLifestyle]}</Typography>
          </Grid>
        )}
        
        {preferences.visitors && (
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">Visitors</Typography>
            <Typography variant="body1">{lifestyleLabels.visitors[preferences.visitors]}</Typography>
          </Grid>
        )}

        {/* Behavior Questions */}
        {preferences.dishesAttitude && (
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">Dishes in Sink</Typography>
            <Typography variant="body1">{lifestyleLabels.dishesAttitude[preferences.dishesAttitude]}</Typography>
          </Grid>
        )}
        
        {preferences.weekendVibe && (
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">Weekend Vibe</Typography>
            <Typography variant="body1">{lifestyleLabels.weekendVibe[preferences.weekendVibe]}</Typography>
          </Grid>
        )}
        
        {preferences.morningEnergy && (
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">Morning Energy</Typography>
            <Typography variant="body1">{lifestyleLabels.morningEnergy[preferences.morningEnergy]}</Typography>
          </Grid>
        )}

        {/* Quick Toggles */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
            {preferences.isSmoker && <Chip label="🚬 Smoker" size="small" />}
            {!preferences.isSmoker && <Chip label="🚭 Non-smoker" size="small" color="success" />}
            {preferences.hasPets && <Chip label="🐾 Has Pets" size="small" />}
            {!preferences.hasPets && <Chip label="🐾 No Pets" size="small" />}
            {preferences.okayWithPets && <Chip label="✅ Okay with pets" size="small" color="primary" />}
            {preferences.shareGroceries && <Chip label="🛒 Shares groceries" size="small" color="primary" />}
            {preferences.shareCooking && <Chip label="🍳 Shares cooking" size="small" color="primary" />}
          </Box>
        </Grid>

        {/* Dealbreakers */}
        {(preferences.noSmokers || preferences.noPets || preferences.noFrequentVisitors) && (
          <Grid item xs={12}>
            <Typography variant="body2" fontWeight="bold" color="error" gutterBottom sx={{ mt: 1 }}>
              Dealbreakers
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {preferences.noSmokers && <Chip label="🚫 No smokers" size="small" color="error" />}
              {preferences.noPets && <Chip label="🚫 No pets" size="small" color="error" />}
              {preferences.noFrequentVisitors && <Chip label="🚫 No frequent visitors" size="small" color="error" />}
            </Box>
          </Grid>
        )}

        {/* Vibes */}
        {preferences.vibes && preferences.vibes.length > 0 && (
          <Grid item xs={12}>
            <Typography variant="body2" fontWeight="bold" gutterBottom sx={{ mt: 1 }}>
              Vibes
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {preferences.vibes.map((vibe) => (
                <Chip key={vibe} label={vibeLabels[vibe]} size="small" color="primary" variant="outlined" />
              ))}
            </Box>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
}
