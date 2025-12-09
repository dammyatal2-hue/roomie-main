# Backend Development - Step-by-Step Guide

## 🎯 Goal
Connect your complete frontend to a working backend with database, authentication, and all features.

---

## 📋 STEP 1: Setup Database (30 minutes)

### 1.1 Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Sign up with email
4. Create organization: "Roomie App"
5. Create project: "Roomie Production"

### 1.2 Create Database Cluster
1. Click "Build a Database"
2. Choose "M0 Free" tier
3. Select region closest to you
4. Cluster name: "roomie-cluster"
5. Click "Create"

### 1.3 Setup Database Access
1. Go to "Database Access" (left sidebar)
2. Click "Add New Database User"
3. Username: `roomie_admin`
4. Password: Click "Autogenerate Secure Password" (SAVE THIS!)
5. Database User Privileges: "Read and write to any database"
6. Click "Add User"

### 1.4 Setup Network Access
1. Go to "Network Access" (left sidebar)
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### 1.5 Get Connection String
1. Go to "Database" (left sidebar)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your saved password
6. Replace `<dbname>` with `roomie-app`

Example:
```
mongodb+srv://roomie_admin:YOUR_PASSWORD@roomie-cluster.xxxxx.mongodb.net/roomie-app?retryWrites=true&w=majority
```

### 1.6 Update Backend .env
```bash
cd backend
```

Edit `backend/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://roomie_admin:YOUR_PASSWORD@roomie-cluster.xxxxx.mongodb.net/roomie-app?retryWrites=true&w=majority
JWT_SECRET=your_generated_secret_here
```

Generate JWT Secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### ✅ Test Database Connection
```bash
cd backend
npm run dev
```

You should see: "MongoDB connected successfully"

---

## 📋 STEP 2: Create API Service Layer (Frontend) (2 hours)

### 2.1 Install Axios
```bash
cd ..
npm install axios
```

### 2.2 Create Services Folder
```bash
mkdir src/services
```

### 2.3 Create Base API Service
Create `src/services/api.js`:
```javascript
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 2.4 Create Auth Service
Create `src/services/authService.js`:
```javascript
import api from './api';

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('currentUser', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('currentUser', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
};
```

### 2.5 Create Property Service
Create `src/services/propertyService.js`:
```javascript
import api from './api';

export const propertyService = {
  getAll: async () => {
    const response = await api.get('/properties');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  },

  create: async (propertyData) => {
    const response = await api.post('/properties', propertyData);
    return response.data;
  },

  update: async (id, propertyData) => {
    const response = await api.put(`/properties/${id}`, propertyData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/properties/${id}`);
    return response.data;
  }
};
```

### 2.6 Create Frontend .env
Create `roomie-app/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

---

## 📋 STEP 3: Connect Login Page (1 hour)

### 3.1 Update Login.js
Replace the mock login in `src/pages/Login.js`:

Find this code:
```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  // ... mock login code
};
```

Replace with:
```javascript
import { authService } from '../services/authService';

const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!formData.email || !formData.password) {
    setError('Please fill in all fields');
    return;
  }
  
  setLoading(true);
  setError('');
  
  try {
    await authService.login(formData.email, formData.password);
    navigate('/home');
  } catch (err) {
    setError(err.response?.data?.message || 'Login failed');
  } finally {
    setLoading(false);
  }
};
```

Update the button:
```javascript
<Button
  type="submit"
  fullWidth
  variant="contained"
  size="large"
  disabled={loading}
  sx={{ mt: 2, py: 1.5, borderRadius: '8px' }}
>
  {loading ? 'Signing in...' : 'Sign in'}
</Button>
```

### ✅ Test Login
1. Start backend: `cd backend && npm run dev`
2. Start frontend: `cd .. && npm start`
3. Try logging in with test account
4. Check browser console for errors
5. Check backend terminal for API calls

---

## 📋 STEP 4: Connect Register Page (30 minutes)

### 4.1 Update Register.js
Add at the top:
```javascript
import { authService } from '../services/authService';
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
```

Update handleSubmit:
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!formData.email || !formData.username || !formData.phone || 
      !formData.location || !formData.password || !formData.agreeTerms) {
    setError('Please fill in all required fields');
    return;
  }
  
  setLoading(true);
  setError('');
  
  try {
    await authService.register({
      name: formData.username,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      location: formData.location
    });
    navigate('/home');
  } catch (err) {
    setError(err.response?.data?.message || 'Registration failed');
  } finally {
    setLoading(false);
  }
};
```

---

## 📋 STEP 5: Connect Property Listings (2 hours)

### 5.1 Update Home.js
Add at the top:
```javascript
import { propertyService } from '../services/propertyService';
import { useEffect, useState } from 'react';

const [properties, setProperties] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  loadProperties();
}, []);

const loadProperties = async () => {
  try {
    const data = await propertyService.getAll();
    setProperties(data);
  } catch (error) {
    console.error('Failed to load properties:', error);
  } finally {
    setLoading(false);
  }
};
```

Replace hardcoded `apartmentListings` with `properties`.

### 5.2 Update Explore.js
Same pattern as Home.js - fetch properties from API.

---

## 📋 STEP 6: Add Image Upload (3 hours)

### 6.1 Setup Cloudinary
1. Go to https://cloudinary.com
2. Sign up for free account
3. Get your credentials from Dashboard:
   - Cloud Name
   - API Key
   - API Secret

### 6.2 Install Cloudinary (Backend)
```bash
cd backend
npm install cloudinary multer multer-storage-cloudinary
```

### 6.3 Update Backend .env
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 6.4 Create Upload Middleware
Create `backend/middleware/upload.js`:
```javascript
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'roomie-app',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp']
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
```

### 6.5 Add Upload Route
In `backend/routes/properties.js`:
```javascript
const upload = require('../middleware/upload');

router.post('/', upload.array('images', 10), async (req, res) => {
  try {
    const images = req.files.map(file => file.path);
    const propertyData = {
      ...req.body,
      images: images
    };
    // Save to database
    res.json(propertyData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
```

### 6.6 Update Frontend ListYourSpace.js
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  const formDataToSend = new FormData();
  formDataToSend.append('title', formData.title);
  formDataToSend.append('location', formData.location);
  formDataToSend.append('price', formData.price);
  // ... other fields
  
  images.forEach((img) => {
    formDataToSend.append('images', img.file);
  });
  
  try {
    await propertyService.create(formDataToSend);
    navigate('/my-listing');
  } catch (error) {
    console.error('Failed to create listing:', error);
  }
};
```

---

## 📋 STEP 7: Add Authentication Middleware (1 hour)

### 7.1 Create Auth Middleware
Create `backend/middleware/auth.js`:
```javascript
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No authentication token' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = auth;
```

### 7.2 Protect Routes
In `backend/routes/properties.js`:
```javascript
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  // Only authenticated users can create properties
});

router.put('/:id', auth, async (req, res) => {
  // Only authenticated users can update
});

router.delete('/:id', auth, async (req, res) => {
  // Only authenticated users can delete
});
```

---

## 📋 STEP 8: Connect Remaining Features (2 days)

### 8.1 Booking Service
Create `src/services/bookingService.js`:
```javascript
import api from './api';

export const bookingService = {
  create: async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },
  
  getUserBookings: async () => {
    const response = await api.get('/bookings/user');
    return response.data;
  },
  
  updateStatus: async (id, status) => {
    const response = await api.patch(`/bookings/${id}/status`, { status });
    return response.data;
  }
};
```

### 8.2 Notification Service
Create `src/services/notificationService.js`:
```javascript
import api from './api';

export const notificationService = {
  getAll: async () => {
    const response = await api.get('/notifications/user');
    return response.data;
  },
  
  markAsRead: async (id) => {
    const response = await api.patch(`/notifications/${id}/read`);
    return response.data;
  }
};
```

### 8.3 Update Pages
- Booking.js → Use bookingService
- Notifications.js → Use notificationService
- MyListing.js → Use propertyService
- Favorites.js → Create favoriteService

---

## 📋 STEP 9: Testing (1 day)

### 9.1 Test Each Feature
- [ ] Login with test account
- [ ] Register new account
- [ ] Browse properties
- [ ] View property details
- [ ] Create booking
- [ ] Upload property with images
- [ ] View notifications
- [ ] Update profile
- [ ] Search properties
- [ ] Roommate matching

### 9.2 Check for Errors
- Browser console
- Backend terminal
- Network tab in DevTools

### 9.3 Fix Bugs
- Handle loading states
- Handle errors gracefully
- Add success messages

---

## 📋 STEP 10: Deployment (1 day)

### 10.1 Deploy Database
✅ Already done (MongoDB Atlas)

### 10.2 Deploy Backend
**Option: Railway**
1. Go to https://railway.app
2. Sign up with GitHub
3. New Project → Deploy from GitHub
4. Select backend folder
5. Add environment variables
6. Deploy

**Get Backend URL**: `https://your-app.railway.app`

### 10.3 Deploy Frontend
**Option: Vercel**
1. Go to https://vercel.com
2. Sign up with GitHub
3. Import repository
4. Add environment variable:
   ```
   REACT_APP_API_URL=https://your-app.railway.app/api
   ```
5. Deploy

### 10.4 Test Production
- Visit your Vercel URL
- Test all features
- Check for CORS errors
- Verify database connections

---

## 📊 Progress Tracking

### Week 1: Core Backend
- [ ] Day 1: Database + Auth (Steps 1-4)
- [ ] Day 2: Properties + Images (Steps 5-6)
- [ ] Day 3: Middleware + Bookings (Steps 7-8)
- [ ] Day 4: Notifications + Testing (Steps 8-9)
- [ ] Day 5: Bug fixes + Polish

### Week 2: Deployment
- [ ] Day 1: Deploy backend
- [ ] Day 2: Deploy frontend
- [ ] Day 3: Testing + fixes
- [ ] Day 4: Final polish
- [ ] Day 5: Launch! 🚀

---

## 🆘 Common Issues & Solutions

### Issue: CORS Error
**Solution**: Add to `backend/server.js`:
```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-vercel-app.vercel.app'],
  credentials: true
}));
```

### Issue: MongoDB Connection Failed
**Solution**: 
- Check connection string
- Verify IP whitelist (0.0.0.0/0)
- Check username/password

### Issue: JWT Token Invalid
**Solution**:
- Verify JWT_SECRET in .env
- Check token format in headers
- Clear localStorage and login again

### Issue: Images Not Uploading
**Solution**:
- Verify Cloudinary credentials
- Check file size limits
- Check allowed formats

---

## 📝 Quick Commands Reference

```bash
# Start Backend
cd backend
npm run dev

# Start Frontend
cd roomie-app
npm start

# Install Dependencies
npm install

# Generate JWT Secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Check MongoDB Connection
mongosh "your_connection_string"
```

---

## ✅ Completion Checklist

### Backend Setup
- [ ] MongoDB Atlas created
- [ ] Database connected
- [ ] Environment variables set
- [ ] Backend running on port 5000

### Frontend Integration
- [ ] API service layer created
- [ ] Auth service working
- [ ] Property service working
- [ ] Login/Register connected
- [ ] Properties loading from API

### Features
- [ ] Authentication working
- [ ] Image upload working
- [ ] Bookings working
- [ ] Notifications working
- [ ] Search working

### Deployment
- [ ] Backend deployed
- [ ] Frontend deployed
- [ ] Production testing complete
- [ ] Website live! 🎉

---

## 🎯 Start Here

**Right Now:**
1. Open terminal
2. Follow STEP 1 (Database Setup)
3. Come back when done
4. Move to STEP 2

**Time Estimate**: 5-7 days for full MVP

**You got this! 💪**
