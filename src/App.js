import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeContextProvider } from './context/ThemeContext';


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
import Chat from './pages/Chat';
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
import ListingDetails from './pages/ListingDetails';

function App() {
  return (
    <ThemeContextProvider>
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
            <Route path="/property-details/:id" element={<ListingDetails />} />
            <Route path="/roommate-matching" element={<RoommateMatching />} />
            <Route path="/roommate-details" element={<PropertyDetails />} />
            
            {/* User Management */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/my-listing" element={<MyListing />} />
            
            {/* Communication */}
            <Route path="/messages" element={<Messages />} />
            <Route path="/chat/:id" element={<Chat />} />
            
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
    </ThemeContextProvider>
  );
}

export default App;