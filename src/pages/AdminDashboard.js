import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  AppBar,
  Toolbar,
  Avatar,
  TextField,
  InputAdornment,
  Badge,
  IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const topProducts = [
  { name: 'Kigali Heights', stock: 4500, price: '$450.00', sales: 4800, earnings: '$175,200' },
  { name: 'Nyarutarama Villa', stock: 1200, price: '$1,299', sales: 3200, earnings: '$156,800' },
  { name: 'Kacyiru Studio', stock: 1500, price: '$280.00', sales: 800, earnings: '$224,000' },
  { name: 'Kimihurura Apt', stock: 2400, price: '$380.00', sales: 1600, earnings: '$234,000' },
  { name: 'Remera Shared', stock: 800, price: '$180.00', sales: 1000, earnings: '$180,000' }
];

const recentActivity = [
  { type: 'order', title: 'Order #2048', subtitle: 'John Doe • 2 Jan 25', action: 'New Order' },
  { type: 'alert', title: 'Low Stock Alert', subtitle: 'Kacyiru on M2 • 1h Jan 30', action: 'Low Stock' },
  { type: 'promo', title: 'Promo code "SUMMER20"', subtitle: 'Applied for 2 • 8h Jan 30', action: 'Campaign' },
  { type: 'system', title: 'System Update', subtitle: 'Version 1.2.1 • 2 Jan 25', action: 'System' }
];

const sidebarItems = [
  { icon: <DashboardIcon />, text: 'Dashboard', active: true },
  { icon: <InventoryIcon />, text: 'Properties' },
  { icon: <ShoppingCartIcon />, text: 'Bookings' },
  { icon: <PeopleIcon />, text: 'Users' },
  { icon: <BarChartIcon />, text: 'Reports' },
  { icon: <SettingsIcon />, text: 'Settings' }
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            background: 'white',
            borderRight: '1px solid #e0e0e0'
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight="bold" color="primary">
            🏠 Roomie
          </Typography>
        </Box>
        <List>
          {sidebarItems.map((item, index) => (
            <ListItem button key={index} sx={{ 
              mx: 1, 
              borderRadius: '8px',
              backgroundColor: item.active ? '#e3f2fd' : 'transparent',
              color: item.active ? '#1976d2' : 'inherit'
            }}>
              <ListItemIcon sx={{ color: item.active ? '#1976d2' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1 }}>
        {/* Top Bar */}
        <AppBar position="static" elevation={0} sx={{ background: 'white', color: 'black' }}>
          <Toolbar>
            <IconButton edge="start" onClick={() => navigate(-1)} sx={{ mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <TextField
              size="small"
              placeholder="Search anything"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mr: 2, width: 200 }}
            />
            <IconButton>
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Avatar sx={{ ml: 1 }}>A</Avatar>
          </Toolbar>
        </AppBar>

        <Box sx={{ p: 3 }}>
          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ p: 2 }}>
                <Typography color="textSecondary" variant="body2">Total Properties</Typography>
                <Typography variant="h4" fontWeight="bold">1,525</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ p: 2 }}>
                <Typography color="textSecondary" variant="body2">Total Sales</Typography>
                <Typography variant="h4" fontWeight="bold">10,892</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ p: 2 }}>
                <Typography color="textSecondary" variant="body2">Total Revenue</Typography>
                <Typography variant="h4" fontWeight="bold">$157,342</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ p: 2 }}>
                <Typography color="textSecondary" variant="body2">Total Expenses</Typography>
                <Typography variant="h4" fontWeight="bold">$12,453</Typography>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            {/* Sales Revenue Chart */}
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3, height: 400 }}>
                <Typography variant="h6" gutterBottom>Sales Revenue</Typography>
                <Box sx={{ 
                  height: 300, 
                  background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Typography color="textSecondary">Chart Placeholder</Typography>
                </Box>
              </Paper>
            </Grid>

            {/* Top Categories */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, height: 400 }}>
                <Typography variant="h6" gutterBottom>Top Categories</Typography>
                <Box sx={{ 
                  height: 200, 
                  background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2
                }}>
                  <Typography color="textSecondary">Pie Chart</Typography>
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">• Apartments</Typography>
                    <Typography variant="body2">68%</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">• Shared Rooms</Typography>
                    <Typography variant="body2">20%</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">• Studios</Typography>
                    <Typography variant="body2">8%</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">• Houses</Typography>
                    <Typography variant="body2">4%</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            {/* Recent Activity */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Recent Activity</Typography>
                <List>
                  {recentActivity.map((activity, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <Box sx={{ width: '100%' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body1" fontWeight="bold">{activity.title}</Typography>
                          <Chip label={activity.action} size="small" variant="outlined" />
                        </Box>
                        <Typography variant="body2" color="textSecondary">{activity.subtitle}</Typography>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>

            {/* Top Products */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Top Properties</Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Property</TableCell>
                        <TableCell>Stock</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Sales</TableCell>
                        <TableCell>Earnings</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {topProducts.map((product, index) => (
                        <TableRow key={index}>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.stock}</TableCell>
                          <TableCell>{product.price}</TableCell>
                          <TableCell>{product.sales}</TableCell>
                          <TableCell>{product.earnings}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}