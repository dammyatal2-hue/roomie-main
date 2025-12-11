import React, { useEffect, useState } from 'react';
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MessageIcon from '@mui/icons-material/Message';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate, useLocation } from 'react-router-dom';

export default function BottomNavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(0);

  const tabs = [
    { label: 'Home', icon: <HomeIcon />, path: '/home' },
    { label: 'Explore', icon: <SearchIcon />, path: '/explore' },
    { label: 'Favorites', icon: <FavoriteIcon />, path: '/favorites' },
    { label: 'Messages', icon: <MessageIcon />, path: '/messages' },
    { label: 'Profile', icon: <PersonIcon />, path: '/profile' },
  ];

  useEffect(() => {
    const idx = tabs.findIndex(t => location.pathname === t.path || location.pathname.startsWith(t.path + '/'));
    setValue(idx === -1 ? 0 : idx);
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const tab = tabs[newValue];
    if (tab) navigate(tab.path);
  };

  return (
    <Paper
      elevation={8}
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: (theme) => theme.zIndex.appBar }}
    >
      <BottomNavigation value={value} onChange={handleChange} showLabels>
        {tabs.map((t) => (
          <BottomNavigationAction key={t.label} label={t.label} icon={t.icon} />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
