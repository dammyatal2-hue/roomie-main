import React from 'react';
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
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import MessageIcon from '@mui/icons-material/Message';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import StarIcon from '@mui/icons-material/Star';

const agentData = {
  1: {
    name: "Esther Howard",
    role: "Real Estate Agent",
    phone: "+250 791 234 567",
    email: "esther@kigalirealty.rw",
    company: "Kigali Realty Ltd",
    location: "Kigali, Rwanda",
    rating: 4.8,
    experience: "5+ years",
    properties: 24,
    bio: "Experienced real estate agent specializing in residential and commercial properties in Kigali. Committed to helping clients find their perfect home or investment opportunity.",
    languages: ["English", "Kinyarwanda", "French"],
    specialties: ["Residential Sales", "Property Management", "Investment Properties"]
  },
  2: {
    name: "David Mugisha",
    role: "Property Manager",
    phone: "+250 792 345 678",
    email: "david@kacyiruresidences.rw",
    company: "Kacyiru Residences",
    location: "Kacyiru, Kigali",
    rating: 4.6,
    experience: "3+ years",
    properties: 18,
    bio: "Professional property manager with expertise in executive suites and corporate housing solutions.",
    languages: ["English", "Kinyarwanda"],
    specialties: ["Executive Housing", "Corporate Rentals", "Property Maintenance"]
  }
};

export default function AgentContact() {
  const navigate = useNavigate();
  const { propertyId } = useParams();
  const agent = agentData[propertyId] || agentData[1];

  const handleCall = () => {
    window.location.href = `tel:${agent.phone}`;
  };

  const handleEmail = () => {
    window.location.href = `mailto:${agent.email}`;
  };

  const handleMessage = () => {
    navigate('/messages');
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <AppBar position="static" elevation={1} sx={{ background: 'white', color: 'text.primary' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="h1" sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>
            Agent Contact
          </Typography>
          <Box sx={{ width: 48 }} />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 2 }}>
        {/* Agent Profile Card */}
        <Paper elevation={1} sx={{ p: 3, mb: 2, borderRadius: '12px', textAlign: 'center' }}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              margin: '0 auto 16px',
              background: 'linear-gradient(135deg, #FE456A 0%, #FF6B8B 100%)',
              fontSize: '2.5rem',
              fontWeight: 'bold'
            }}
          >
            {agent.name.split(' ').map(n => n[0]).join('')}
          </Avatar>
          <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
            {agent.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {agent.role}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {agent.company} • {agent.experience} experience
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
            <StarIcon sx={{ color: '#FFD700', fontSize: 20 }} />
            <Typography variant="body2" fontWeight="bold">
              {agent.rating} • {agent.properties} properties
            </Typography>
          </Box>
        </Paper>

        {/* Contact Actions */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={4}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<PhoneIcon />}
              onClick={handleCall}
              sx={{
                py: 2,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)'
              }}
            >
              Call
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<EmailIcon />}
              onClick={handleEmail}
              sx={{
                py: 2,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)'
              }}
            >
              Email
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<MessageIcon />}
              onClick={handleMessage}
              sx={{
                py: 2,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #FE456A 0%, #FF6B8B 100%)'
              }}
            >
              Message
            </Button>
          </Grid>
        </Grid>

        {/* Contact Information */}
        <Paper elevation={1} sx={{ p: 3, mb: 2, borderRadius: '12px' }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Contact Information
          </Typography>
          <List sx={{ p: 0 }}>
            <ListItem sx={{ px: 0 }}>
              <ListItemIcon>
                <PhoneIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Phone" 
                secondary={agent.phone}
              />
            </ListItem>
            <ListItem sx={{ px: 0 }}>
              <ListItemIcon>
                <EmailIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Email" 
                secondary={agent.email}
              />
            </ListItem>
            <ListItem sx={{ px: 0 }}>
              <ListItemIcon>
                <BusinessIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Company" 
                secondary={agent.company}
              />
            </ListItem>
            <ListItem sx={{ px: 0 }}>
              <ListItemIcon>
                <LocationOnIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Location" 
                secondary={agent.location}
              />
            </ListItem>
          </List>
        </Paper>

        {/* About */}
        <Paper elevation={1} sx={{ p: 3, mb: 2, borderRadius: '12px' }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            About {agent.name}
          </Typography>
          <Typography variant="body1" paragraph>
            {agent.bio}
          </Typography>
        </Paper>

        {/* Specialties & Languages */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={1} sx={{ p: 3, borderRadius: '12px' }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Specialties
              </Typography>
              {agent.specialties.map((specialty, index) => (
                <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                  • {specialty}
                </Typography>
              ))}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={1} sx={{ p: 3, borderRadius: '12px' }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Languages
              </Typography>
              {agent.languages.map((language, index) => (
                <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                  • {language}
                </Typography>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}