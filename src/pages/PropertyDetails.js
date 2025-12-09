import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Button,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Rating,
  Divider,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WifiIcon from '@mui/icons-material/Wifi';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import BathtubIcon from '@mui/icons-material/Bathtub';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SecurityIcon from '@mui/icons-material/Security';
import PoolIcon from '@mui/icons-material/Pool';
import YardIcon from '@mui/icons-material/Yard';
import BalconyIcon from '@mui/icons-material/Balcony';

// Complete property database with roommate apartments
const propertyDatabase = {
  1: {
    id: 1,
    title: "Kigali Heights Luxury Apartment",
    location: "Nyarutarama, Kigali",
    price: "$450/month",
    rating: 4.8,
    type: "Luxury Apartment",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
    bedrooms: 2,
    bathrooms: 2,
    area: "1,200 sqft",
    buildYear: 2022,
    status: "Available Now",
    amenities: ["WiFi", "AC", "Parking", "Gym", "Security", "Pool"],
    description: "Experience luxury living in this stunning modern apartment located in the prestigious Nyarutarama neighborhood. This spacious 2-bedroom apartment features floor-to-ceiling windows with panoramic city views, high-end finishes, and premium amenities. The open-concept living area flows seamlessly into a gourmet kitchen with stainless steel appliances and marble countertops. Master bedroom includes walk-in closet and en-suite bathroom with soaking tub. Building amenities include 24/7 security, swimming pool, fitness center, and concierge services. Perfect for professionals seeking premium accommodation in Kigali's most desirable area.",
    agent: {
      name: "Esther Howard",
      role: "Real Estate Agent",
      phone: "+250 791 234 567",
      email: "esther@kigalirealty.rw"
    },
    facilities: ["Hospital - 2km", "Shopping Mall - 1km", "Restaurants - 500m", "Supermarket - 300m", "Bank - 800m"],
    reviews: [
      { name: "Theresa Webb", rating: 5, comment: "Beautiful apartment with amazing views. The location is perfect and amenities are top-notch.", date: "2 weeks ago" },
      { name: "Annette Black", rating: 4.5, comment: "Great modern apartment. The security and maintenance services are excellent.", date: "1 month ago" }
    ]
  },
  2: {
    id: 2,
    title: "Kacyiru Executive Suite",
    location: "Kacyiru, Kigali",
    price: "$320/month",
    rating: 4.5,
    type: "Executive Suite",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
    bedrooms: 1,
    bathrooms: 1,
    area: "800 sqft",
    buildYear: 2020,
    status: "Available Now",
    amenities: ["WiFi", "AC", "Security", "Balcony"],
    description: "Perfectly situated in the heart of Kacyiru, this executive suite offers convenience and comfort for busy professionals. Located minutes from government offices, embassies, and popular restaurants. The suite features a spacious bedroom, modern bathroom, and open-plan living area with a fully equipped kitchenette. Large balcony overlooking the city. Building includes 24/7 security and maintenance services. Ideal for single professionals or couples working in the government district.",
    agent: {
      name: "David Mugisha",
      role: "Property Manager",
      phone: "+250 792 345 678",
      email: "david@kacyiruresidences.rw"
    },
    facilities: ["Government Offices - 500m", "Restaurants - 200m", "Bank - 300m", "Supermarket - 400m"],
    reviews: [
      { name: "James N.", rating: 4.5, comment: "Great location for work. The apartment is clean and well-maintained.", date: "3 weeks ago" },
      { name: "Sarah K.", rating: 4, comment: "Good value for money. Security is reliable and neighbors are quiet.", date: "2 months ago" }
    ]
  },
  3: {
    id: 3,
    title: "Kimihurura Garden Apartments",
    location: "Kimihurura, Kigali",
    price: "$380/month",
    rating: 4.7,
    type: "Garden Apartment",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
    bedrooms: 2,
    bathrooms: 1,
    area: "950 sqft",
    buildYear: 2019,
    status: "Available Now",
    amenities: ["WiFi", "Garden", "Parking", "Balcony"],
    description: "Nestled in the peaceful Kimihurura diplomatic area, this garden apartment offers a perfect blend of city convenience and tranquil living. The apartment features two spacious bedrooms, modern bathroom, and a large living area that opens to a private balcony overlooking the beautifully maintained gardens. The community garden is perfect for relaxation and social gatherings. Located close to embassies, international schools, and upscale restaurants. Secure compound with dedicated parking.",
    agent: {
      name: "Marie Uwase",
      role: "Real Estate Agent",
      phone: "+250 793 456 789",
      email: "marie@kimihururaproperties.rw"
    },
    facilities: ["Embassies - 1km", "International Schools - 2km", "Restaurants - 500m", "Park - 800m"],
    reviews: [
      { name: "Robert T.", rating: 5, comment: "Love the garden and peaceful environment. Perfect for families.", date: "1 week ago" },
      { name: "Grace M.", rating: 4.5, comment: "Beautiful apartment in a great neighborhood. Very safe and quiet.", date: "1 month ago" }
    ]
  },
  4: {
    id: 4,
    title: "Gisozi Modern Studio",
    location: "Gisozi, Kigali",
    price: "$280/month",
    rating: 4.3,
    type: "Studio",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    bedrooms: 1,
    bathrooms: 1,
    area: "600 sqft",
    buildYear: 2021,
    status: "Available Now",
    amenities: ["WiFi", "AC", "Balcony", "Security"],
    description: "Affordable and modern studio apartment in the historic Gisozi area. Perfect for students or young professionals starting their careers in Kigali. This efficiently designed studio includes a sleeping area, compact kitchenette, and modern bathroom. Large windows provide plenty of natural light and the balcony offers city views. Located close to Kigali Genocide Memorial, universities, and public transportation. Building features 24/7 security and on-site maintenance.",
    agent: {
      name: "Jean Bosco",
      role: "Property Agent",
      phone: "+250 794 567 890",
      email: "jean@gisoziapartments.rw"
    },
    facilities: ["Kigali Genocide Memorial - 1km", "University - 2km", "Bus Station - 500m", "Market - 800m"],
    reviews: [
      { name: "Student L.", rating: 4, comment: "Great value for students. Location is convenient for university.", date: "2 weeks ago" },
      { name: "Young P.", rating: 4.5, comment: "Perfect first apartment. Clean, secure, and affordable.", date: "3 months ago" }
    ]
  },
  5: {
    id: 5,
    title: "Kicukiro Family Home",
    location: "Kicukiro, Kigali",
    price: "$520/month",
    rating: 4.6,
    type: "Family House",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=300&fit=crop",
    bedrooms: 3,
    bathrooms: 2,
    area: "1,500 sqft",
    buildYear: 2018,
    status: "Available Now",
    amenities: ["WiFi", "Parking", "Garden", "Security"],
    description: "Spacious family home in the vibrant Kicukiro district, perfect for families or professionals needing extra space. This well-maintained home features three generous bedrooms, two modern bathrooms, large living area, and a fully equipped kitchen. Private garden and patio area ideal for children and entertaining. Located in a quiet residential neighborhood with easy access to schools, shopping centers, and public transportation. Secure compound with parking for two vehicles.",
    agent: {
      name: "Alice N.",
      role: "Family Homes Specialist",
      phone: "+250 795 678 901",
      email: "alice@kicukirohomes.rw"
    },
    facilities: ["Schools - 1km", "Shopping Center - 2km", "Hospital - 3km", "Playground - 500m"],
    reviews: [
      { name: "Family M.", rating: 5, comment: "Perfect for our family of four. The garden is great for kids.", date: "1 month ago" },
      { name: "Working P.", rating: 4.5, comment: "Spacious and comfortable. Neighborhood is family-friendly.", date: "2 months ago" }
    ]
  },
  6: {
    id: 6,
    title: "Remera Shared Apartment - Perfect for Roommates",
    location: "Remera, Kigali",
    price: "$180/month per room",
    rating: 4.2,
    type: "Shared Apartment",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    bedrooms: 3,
    bathrooms: 2,
    availableRooms: 2,
    area: "1,100 sqft",
    buildYear: 2020,
    status: "2 Rooms Available",
    amenities: ["WiFi", "Shared Kitchen", "Laundry", "Security", "Furnished", "Utilities Included"],
    description: "Perfect shared living arrangement in the vibrant Remera neighborhood! This spacious 3-bedroom apartment has 2 rooms available for responsible roommates. Located just 10 minutes from Amahoro Stadium and close to public transportation, markets, and local restaurants. The apartment features a large shared living area, fully equipped kitchen, and two modern bathrooms. Each bedroom comes furnished with a bed, desk, wardrobe, and reading chair. Utilities (water, electricity, WiFi) are included in the rent. Great opportunity for students or young professionals looking for affordable accommodation in a friendly, secure building.",
    
    // Roommate-specific details
    roommateInfo: {
      totalRoommates: 3,
      currentRoommates: 1,
      availableRooms: 2,
      roommateGender: "Mixed",
      preferredAge: "20-35",
      lifestyle: "Professional/Student",
      houseRules: [
        "No smoking inside",
        "Keep common areas clean",
        "Respect quiet hours (10 PM - 7 AM)",
        "Guests allowed with prior notice",
        "Split utilities equally"
      ]
    },
    
    roomDetails: [
      {
        roomNumber: 1,
        size: "12' x 14'",
        price: "$180/month",
        features: ["Large window", "Built-in wardrobe", "Study desk", "Bookshelf"],
        status: "Available",
        images: ["/api/placeholder/300/200"]
      },
      {
        roomNumber: 2,
        size: "10' x 12'",
        price: "$160/month",
        features: ["Balcony access", "Closet", "Desk", "Reading chair"],
        status: "Available",
        images: ["/api/placeholder/300/200"]
      }
    ],
    
    currentRoommates: [
      {
        name: "Alex K.",
        age: 26,
        occupation: "Graduate Student",
        duration: "8 months",
        interests: ["Reading", "Jogging", "Cooking", "Music"],
        bio: "Quiet graduate student studying computer science. Usually studying or at campus during the day."
      }
    ],

    agent: {
      name: "Sarah M.",
      role: "Roommate Coordinator",
      phone: "+250 796 789 012",
      email: "sarah@roomieshared.rw"
    },
    
    facilities: ["Amahoro Stadium - 800m", "Bus Station - 300m", "Market - 500m", "Restaurants - 400m", "Gym - 1km"],
    
    reviews: [
      { name: "Previous Tenant", rating: 4.5, comment: "Great location and the roommates were very respectful. Good value for money.", date: "3 months ago" },
      { name: "Current Resident", rating: 4, comment: "Safe building and good management. The shared spaces are well-maintained.", date: "1 month ago" }
    ]
  },
  7: {
    id: 7,
    title: "Kiyovu Premium Shared Residence",
    location: "Kiyovu, Kigali",
    price: "$300/month per room",
    rating: 4.9,
    type: "Premium Shared Residence",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&h=300&fit=crop",
    bedrooms: 4,
    bathrooms: 3,
    availableRooms: 1,
    area: "1,800 sqft",
    buildYear: 2021,
    status: "1 Room Available",
    amenities: ["WiFi", "AC", "Pool", "Gym", "Security", "Cleaning Service", "Furnished"],
    description: "Luxury shared living in prestigious Kiyovu! This premium residence offers upscale shared accommodation for professionals. One spacious room available in a 4-bedroom, 3-bathroom luxury apartment. Features include marble floors, modern kitchen with premium appliances, spacious living area, and access to building amenities including swimming pool, fitness center, and 24/7 security. Perfect for executives or professionals who appreciate luxury living with the social benefits of shared accommodation. Cleaning service included twice weekly for common areas.",
    
    roommateInfo: {
      totalRoommates: 4,
      currentRoommates: 3,
      availableRooms: 1,
      roommateGender: "Mixed",
      preferredAge: "25-40",
      lifestyle: "Professional",
      houseRules: [
        "Professional lifestyle preferred",
        "No parties",
        "Cleaning service schedule must be respected",
        "Kitchen clean after use",
        "Pool hours: 6 AM - 10 PM"
      ]
    },
    
    roomDetails: [
      {
        roomNumber: 4,
        size: "14' x 16'",
        price: "$300/month",
        features: ["En-suite bathroom", "Walk-in closet", "Balcony", "AC", "Smart TV"],
        status: "Available",
        images: ["/api/placeholder/300/200"]
      }
    ],
    
    currentRoommates: [
      {
        name: "Dr. Isabelle R.",
        age: 32,
        occupation: "Medical Doctor",
        duration: "1 year",
        interests: ["Yoga", "Reading", "Fine Dining", "Travel"],
        bio: "Hospital resident with irregular hours. Respectful and clean."
      },
      {
        name: "Mark T.",
        age: 29,
        occupation: "Investment Banker",
        duration: "8 months",
        interests: ["Finance", "Tennis", "Wine Tasting", "Business Networking"],
        bio: "Works long hours, usually travels on weekends. Very organized."
      },
      {
        name: "Sophie L.",
        age: 27,
        occupation: "UN Consultant",
        duration: "6 months",
        interests: ["International Relations", "Photography", "Hiking", "Languages"],
        bio: "Works from home sometimes, very international background."
      }
    ],

    agent: {
      name: "Robert K.",
      role: "Premium Residences Manager",
      phone: "+250 797 890 123",
      email: "robert@kiyovupremium.rw"
    },
    
    facilities: ["City Center - 2km", "Fine Dining - 500m", "Fitness Center - In building", "Pool - In building", "Security - 24/7"],
    
    reviews: [
      { name: "Former Resident", rating: 5, comment: "Absolutely luxury living. The roommates were all professionals and very respectful.", date: "2 months ago" },
      { name: "Current Resident", rating: 4.8, comment: "Best shared accommodation in Kigali. The amenities are worth every penny.", date: "3 weeks ago" }
    ]
  },
  8: {
    id: 8,
    title: "Gikondo Student Shared Apartment",
    location: "Gikondo, Kigali",
    price: "$120/month per room",
    rating: 4.1,
    type: "Student Shared Apartment",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
    bedrooms: 4,
    bathrooms: 2,
    availableRooms: 3,
    area: "900 sqft",
    buildYear: 2019,
    status: "3 Rooms Available",
    amenities: ["WiFi", "Study Area", "Shared Kitchen", "Laundry", "Security", "Furnished"],
    description: "Budget-friendly student shared apartment in the lively Gikondo area! Perfect for university students looking for affordable accommodation close to campuses. Three rooms available in a 4-bedroom apartment. Basic furnishings included - bed, study desk, and storage. Shared kitchen with basic appliances, two bathrooms, and a common study area. Located near universities, libraries, and student-friendly cafes. Utilities excluded - to be split among roommates. Great opportunity to build friendships with fellow students while keeping costs low.",
    
    roommateInfo: {
      totalRoommates: 4,
      currentRoommates: 1,
      availableRooms: 3,
      roommateGender: "Mixed",
      preferredAge: "18-25",
      lifestyle: "Student",
      houseRules: [
        "Student-focused environment",
        "Study-friendly atmosphere",
        "Kitchen clean-up rotation",
        "Quiet hours during exams",
        "Respect shared resources"
      ]
    },
    
    roomDetails: [
      {
        roomNumber: 1,
        size: "10' x 12'",
        price: "$120/month",
        features: ["Study desk", "Bookshelf", "Window", "Closet"],
        status: "Available",
        images: ["/api/placeholder/300/200"]
      },
      {
        roomNumber: 2,
        size: "9' x 11'",
        price: "$110/month",
        features: ["Study desk", "Small balcony", "Storage", "Reading lamp"],
        status: "Available",
        images: ["/api/placeholder/300/200"]
      },
      {
        roomNumber: 3,
        size: "11' x 13'",
        price: "$130/month",
        features: ["Large window", "Study desk", "Wardrobe", "Extra storage"],
        status: "Available",
        images: ["/api/placeholder/300/200"]
      }
    ],
    
    currentRoommates: [
      {
        name: "Eric D.",
        age: 21,
        occupation: "University Student",
        duration: "4 months",
        interests: ["Gaming", "Basketball", "Programming", "Movies"],
        bio: "Computer science student, usually coding or gaming. Friendly and easy-going."
      }
    ],

    agent: {
      name: "Grace U.",
      role: "Student Housing Coordinator",
      phone: "+250 798 901 234",
      email: "grace@studenthousing.rw"
    },
    
    facilities: ["University - 2km", "Library - 1.5km", "Student Cafe - 300m", "Bus Stop - 200m", "Market - 800m"],
    
    reviews: [
      { name: "Former Student", rating: 4, comment: "Great value for students. Location is perfect for campus access.", date: "4 months ago" },
      { name: "Current Student", rating: 4.2, comment: "Basic but comfortable. Good for budget-conscious students.", date: "2 months ago" }
    ]
  }
};

const getAmenityIcon = (amenity) => {
  switch (amenity) {
    case 'WiFi': return <WifiIcon />;
    case 'AC': return <AcUnitIcon />;
    case 'Parking': return <LocalParkingIcon />;
    case 'Gym': return <FitnessCenterIcon />;
    case 'Security': return <SecurityIcon />;
    case 'Pool': return <PoolIcon />;
    case 'Garden': return <YardIcon />;
    case 'Balcony': return <BalconyIcon />;
    case 'Laundry': return <BathtubIcon />;
    case 'Cleaning Service': return <SecurityIcon />;
    case 'Furnished': return <BathtubIcon />;
    case 'Utilities Included': return <WifiIcon />;
    case 'Study Area': return <FitnessCenterIcon />;
    case 'Shared Kitchen': return <BathtubIcon />;
    default: return <WifiIcon />;
  }
};

export default function PropertyDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  // Get property from state (passed from Explore) or from URL parameters
  const stateProperty = location.state?.property;
  const searchParams = new URLSearchParams(location.search);
  const propertyId = parseInt(searchParams.get('id')) || 1;
  const property = stateProperty || propertyDatabase[propertyId] || propertyDatabase[1];

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const isSharedApartment = property.type ? (property.type.includes('Shared') || property.type.includes('Student')) : false;

  const handleApplyForRoom = () => {
    setRequestSent(true);
    alert(`Room application sent! The current roommates will review your profile.`);
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Header */}
      <AppBar position="static" elevation={1} sx={{ background: 'white', color: 'text.primary' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="h1" sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>
            Property Details
          </Typography>
          <IconButton color="inherit" onClick={toggleFavorite}>
            {isFavorite ? <FavoriteIcon sx={{ color: '#FE456A' }} /> : <FavoriteBorderIcon />}
          </IconButton>
          <IconButton color="inherit">
            <ShareIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 2 }}>
        {/* Property Header */}
        <Paper elevation={1} sx={{ p: 3, mb: 2, borderRadius: '12px' }}>
          <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
            {property.title}
          </Typography>
          <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
            {property.price}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant="body1" color="text.secondary">
              📍 {property.location}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Rating value={property.rating} readOnly size="small" />
            <Typography variant="body2" color="text.secondary">
              {property.rating} • {property.reviews?.length || 0} reviews
            </Typography>
            <Chip 
              label={property.type} 
              color="primary" 
              size="small"
              sx={{ ml: 1 }}
            />
          </Box>
        </Paper>

        {/* Property Image Gallery */}
        <Paper elevation={1} sx={{ p: 0, mb: 2, borderRadius: '12px', overflow: 'hidden' }}>
          <Box
            component="img"
            src={property.image}
            alt={property.title}
            sx={{
              width: '100%',
              height: '300px',
              objectFit: 'cover'
            }}
          />
        </Paper>

        {/* Property Details */}
        <Paper elevation={1} sx={{ p: 3, mb: 2, borderRadius: '12px' }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Property Details
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6} sm={3}>
              <Typography variant="body2" color="text.secondary">Bedrooms</Typography>
              <Typography variant="h6" fontWeight="bold">{property.bedrooms}</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="body2" color="text.secondary">Bathrooms</Typography>
              <Typography variant="h6" fontWeight="bold">{property.bathrooms}</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="body2" color="text.secondary">Area</Typography>
              <Typography variant="h6" fontWeight="bold">{property.area}</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="body2" color="text.secondary">Built</Typography>
              <Typography variant="h6" fontWeight="bold">{property.buildYear}</Typography>
            </Grid>
          </Grid>

          {property.status && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">Status</Typography>
            <Chip 
              label={property.status} 
              color={property.status.includes('Available') ? 'primary' : 'default'}
              sx={{ fontWeight: 'bold' }}
            />
          </Box>
          )}

          <Typography variant="body1" paragraph>
            {property.description}
          </Typography>
        </Paper>

        {/* Roommate Information - Only for shared apartments */}
        {isSharedApartment && (
          <Paper elevation={1} sx={{ p: 3, mb: 2, borderRadius: '12px' }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              🏠 Roommate Information
            </Typography>
            
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">Total Rooms</Typography>
                <Typography variant="h6" fontWeight="bold">{property.roommateInfo.totalRoommates}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">Available Rooms</Typography>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  {property.roommateInfo.availableRooms}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">Preferred Age</Typography>
                <Typography variant="body1" fontWeight="bold">{property.roommateInfo.preferredAge}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">Lifestyle</Typography>
                <Typography variant="body1" fontWeight="bold">{property.roommateInfo.lifestyle}</Typography>
              </Grid>
            </Grid>

            {/* Available Rooms */}
            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
              Available Rooms
            </Typography>
            <Grid container spacing={2}>
              {property.roomDetails.map((room, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: '8px' }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Room {room.roomNumber} - {room.size}
                    </Typography>
                    <Typography variant="h6" color="primary" fontWeight="bold">
                      {room.price}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1, mb: 2 }}>
                      {room.features.map((feature, idx) => (
                        <Chip key={idx} label={feature} size="small" variant="outlined" />
                      ))}
                    </Box>
                    <Chip 
                      label={room.status} 
                      color={room.status === 'Available' ? 'success' : 'default'}
                      size="small"
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        )}

        {/* Current Roommates - Only for shared apartments */}
        {isSharedApartment && property.currentRoommates && property.currentRoommates.length > 0 && (
          <Paper elevation={1} sx={{ p: 3, mb: 2, borderRadius: '12px' }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              👥 Current Roommates
            </Typography>
            
            <Grid container spacing={2}>
              {property.currentRoommates.map((roommate, index) => (
                <Grid item xs={12} key={index}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      gap: 2, 
                      alignItems: 'flex-start', 
                      p: 2, 
                      border: '1px solid', 
                      borderColor: 'divider', 
                      borderRadius: '8px',
                      cursor: 'pointer',
                      '&:hover': {
                        boxShadow: 2,
                        borderColor: 'primary.main'
                      }
                    }}
                    onClick={() => navigate(`/roommate-profile/${index + 1}`)}
                  >
                    <Box sx={{ 
                      width: 50, 
                      height: 50, 
                      background: 'linear-gradient(135deg, #FE456A 0%, #FF6B8B 100%)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '1rem'
                    }}>
                      {roommate.name.split(' ').map(n => n[0]).join('')}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {roommate.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {roommate.occupation} • Living here for {roommate.duration}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1, mb: 1 }}>
                        {roommate.bio}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {roommate.interests.map((interest, idx) => (
                          <Chip key={idx} label={interest} size="small" variant="outlined" />
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        )}

        {/* House Rules - Only for shared apartments */}
        {isSharedApartment && property.roommateInfo && property.roommateInfo.houseRules && (
          <Paper elevation={1} sx={{ p: 3, mb: 2, borderRadius: '12px' }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              📋 House Rules
            </Typography>
            <List>
              {property.roommateInfo.houseRules.map((rule, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Typography color="primary">•</Typography>
                  </ListItemIcon>
                  <ListItemText primary={rule} />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}

        {/* Amenities */}
        {property.amenities && property.amenities.length > 0 && (
        <Paper elevation={1} sx={{ p: 3, mb: 2, borderRadius: '12px' }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Amenities
          </Typography>
          <Grid container spacing={1}>
            {property.amenities.map((amenity, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 1 }}>
                  {getAmenityIcon(amenity)}
                  <Typography variant="body2">{amenity}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
        )}

        {/* Agent Section */}
        {property.agent && (
        <Paper 
          elevation={1} 
          sx={{ 
            p: 3, 
            mb: 2, 
            borderRadius: '12px',
            cursor: 'pointer',
            '&:hover': {
              boxShadow: 3
            }
          }}
          onClick={() => navigate(`/agent-contact/${property.id}`)}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Contact Agent
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ 
              width: 60, 
              height: 60, 
              background: 'linear-gradient(135deg, #FE456A 0%, #FF6B8B 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.2rem'
            }}>
              {property.agent.name.split(' ').map(n => n[0]).join('')}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight="bold">
                {property.agent.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {property.agent.role}
              </Typography>
            </Box>
          </Box>
        </Paper>
        )}

        {/* Location & Facilities */}
        {property.facilities && property.facilities.length > 0 && (
        <Paper elevation={1} sx={{ p: 3, mb: 2, borderRadius: '12px' }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Location & Nearby Facilities
          </Typography>
          <List>
            {property.facilities.map((facility, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <Typography color="primary">•</Typography>
                </ListItemIcon>
                <ListItemText primary={facility} />
              </ListItem>
            ))}
          </List>
        </Paper>
        )}

        {/* Reviews */}
        {property.reviews && property.reviews.length > 0 && (
        <Paper elevation={1} sx={{ p: 3, mb: 2, borderRadius: '12px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              Reviews ({property.reviews.length})
            </Typography>
            <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
              See all
            </Typography>
          </Box>

          {property.reviews.map((review, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Box sx={{ 
                  width: 40, 
                  height: 40, 
                  background: '#e0e0e0',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold'
                }}>
                  {review.name.split(' ').map(n => n[0]).join('')}
                </Box>
                <Box>
                  <Typography variant="body1" fontWeight="bold">{review.name}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Rating value={review.rating} readOnly size="small" />
                    <Typography variant="caption" color="text.secondary">
                      {review.date}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {review.comment}
              </Typography>
              {index < property.reviews.length - 1 && <Divider sx={{ my: 2 }} />}
            </Box>
          ))}
        </Paper>
        )}

        {/* Book Now / Apply for Room Button */}
        {requestSent ? (
          <Paper elevation={1} sx={{ p: 3, borderRadius: '12px', textAlign: 'center', bgcolor: 'success.light' }}>
            <Typography variant="h6" fontWeight="bold" color="success.dark" gutterBottom>
              Application Sent! ✅
            </Typography>
            <Typography variant="body2" color="success.dark">
              Your room application has been sent to the current roommates. They will review your profile and get back to you soon.
            </Typography>
          </Paper>
        ) : (
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={isSharedApartment ? handleApplyForRoom : () => navigate('/booking')}
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
            {isSharedApartment ? 'Apply for Room' : 'Book Now'}
          </Button>
        )}
      </Container>
    </Box>
  );
}