import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


// Pages
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Favorites from './pages/Favorites';
import PropertyDetails from './pages/PropertyDetails';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import Search from './pages/Search';
import Booking from './pages/Booking';
import MyListing from './pages/MyListing';
import RoommateMatching from './pages/RoommateMatching';
import EditProfile from './pages/EditProfile';
import AdminDashboard from './pages/AdminDashboard';
import Settings from './pages/Settings';
import Payment from './pages/Payment';
import Notifications from './pages/Notifications';
import ListYourSpace from './pages/ListYourSpace';
import UserProfile from './pages/UserProfile';
import AgentContact from './pages/AgentContact';
import RoommateProfile from './pages/RoommateProfile';
import MatchProfile from './pages/MatchProfile';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FE456A',
      light: '#FF7A94',
      dark: '#D32F4E',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#2D3748',
      light: '#4A5568',
      dark: '#1A202C',
    },
    background: {
      default: '#F7FAFC',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '12px',
          fontWeight: 600,
          padding: '10px 24px',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(254, 69, 106, 0.3)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #FE456A 0%, #FF6B8B 100%)',
          boxShadow: '0 2px 8px rgba(254, 69, 106, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #D32F4E 0%, #FE456A 100%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 8px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          background: '#FFFFFF',
          borderTop: '1px solid #E2E8F0',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className="App">
            <Routes>
            {/* Authentication & Onboarding */}
            <Route path="/" element={<Onboarding />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Main App Pages */}
            <Route path="/home" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/search" element={<Search />} />
            
            {/* Property & Roommate Pages */}
            <Route path="/property-details" element={<PropertyDetails />} />
            <Route path="/roommate-matching" element={<RoommateMatching />} />
            <Route path="/roommate-details" element={<PropertyDetails />} />
            
            {/* User Management */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/my-listing" element={<MyListing />} />
            
            {/* Communication */}
            <Route path="/messages" element={<Messages />} />
            
            {/* Booking System */}
            <Route path="/booking" element={<Booking />} />
            
            {/* Admin */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            
            {/* Profile Menu Pages */}
            <Route path="/settings" element={<Settings />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/list-your-space" element={<ListYourSpace />} />
            <Route path="/user-profile/:userId" element={<UserProfile />} />
            <Route path="/agent-contact/:propertyId" element={<AgentContact />} />
            <Route path="/roommate-profile/:roommateId" element={<RoommateProfile />} />
            <Route path="/match-profile/:userId" element={<MatchProfile />} />
            <Route path="/recent" element={<Profile />} />
            <Route path="/about" element={<Profile />} />
            </Routes>
          </div>
        </Router>
    </ThemeProvider>
  );
}

export default App;