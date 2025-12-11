import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Paper,
  AppBar,
  Toolbar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    title: "Find the perfect roommate match",
    subtitle: "connect with trusted roommates who fit your lifestyle"
  },
  {
    title: "Find the perfect match in just one click",
    subtitle: "save time and connect with verified roommates near you"
  },
  {
    title: "Discover the perfect home with us",
    subtitle: "browse safe, verified spaces and choose what feels like home"
  }
];

export default function Onboarding() {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      navigate('/login');
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    navigate('/login');
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #FE456A 0%, #FF6B8B 100%)',
      display: 'flex', 
      flexDirection: 'column'
    }}>
      {/* Header with skip button */}
      <AppBar 
        position="static" 
        elevation={0} 
        sx={{ 
          background: 'transparent',
          padding: '16px 0'
        }}
      >
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
          <Button 
            onClick={handleSkip}
            sx={{ 
              color: 'white',
              textTransform: 'none',
              fontWeight: 'bold'
            }}
          >
            Skip
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        padding: '40px 24px',
        textAlign: 'center'
      }}>
        
        {/* Logo Section */}
        <Box sx={{ mb: 4 }}>
          {/* Option 1: If you have a logo image */}
          <Box
            component="img"
            src="/images/roomie-logo.png" // Update this path to your logo
            alt="Roomie Logo"
            sx={{
              width: '120px',
              height: '120px',
              margin: '0 auto 16px',
              borderRadius: '20px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              objectFit: 'contain'
            }}
          />
          
          {/* Fallback: If no logo image, show text logo */}
          {/* Remove this Typography if you're using an image logo */}
          <Typography 
            variant="h2" 
            component="h1" 
            fontWeight="bold" 
            color="white"
            sx={{ 
              fontSize: { xs: '2.5rem', md: '3rem' },
              letterSpacing: '0.1em'
            }}
          >
            R O O M I E
          </Typography>
        </Box>

        {/* Step Content */}
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Paper 
            elevation={0} 
            sx={{ 
              background: 'transparent',
              color: 'white',
              maxWidth: '400px'
            }}
          >
            <Typography 
              variant="h4" 
              component="h2" 
              gutterBottom 
              fontWeight="bold"
              sx={{ 
                fontSize: { xs: '1.8rem', md: '2.2rem' },
                lineHeight: 1.2,
                mb: 2
              }}
            >
              {steps[activeStep].title}
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                fontSize: '1.1rem',
                opacity: 0.9,
                lineHeight: 1.5
              }}
            >
              {steps[activeStep].subtitle}
            </Typography>
          </Paper>
        </Box>

        {/* Bottom Section - Stepper and Button */}
        <Box sx={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
          {/* Stepper */}
          <Stepper 
            activeStep={activeStep} 
            sx={{ 
              mb: 4,
              '& .MuiStepConnector-line': {
                borderColor: 'rgba(255,255,255,0.3)'
              }
            }}
          >
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel 
                  sx={{
                    '& .MuiStepIcon-root': {
                      color: 'rgba(255,255,255,0.3)',
                      '&.Mui-active': {
                        color: 'white'
                      },
                      '&.Mui-completed': {
                        color: 'white'
                      }
                    }
                  }}
                />
              </Step>
            ))}
          </Stepper>
          
          {/* Next Button */}
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleNext}
            sx={{ 
              py: 2,
              background: 'white',
              color: '#FE456A',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              borderRadius: '12px',
              '&:hover': {
                background: 'rgba(255,255,255,0.9)',
              }
            }}
          >
            {activeStep === steps.length - 1 ? 'Get Started' : 'Next'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}