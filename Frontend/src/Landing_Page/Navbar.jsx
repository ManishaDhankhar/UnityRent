import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PostAddIcon from '@mui/icons-material/PostAdd';
import GoogleTranslate from './GoogleTranslate.jsx'; 
import './Navbar.css';

// No need to import AddNewProduct here anymore since it's a separate page now!

const pages = ['Home', 'Browse', 'About Us', 'Contact'];
const settings = ['Profile', 'My Rentals', 'Logout'];

function Navbar() {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <AppBar position="sticky" className="navbar-main" sx={{ bgcolor: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          
          {/* 1. LOGO SECTION */}
          <Typography 
            variant="h6" 
            noWrap 
            onClick={() => navigate('/')} // Navigate home on click
            sx={{ fontWeight: 800, color: '#002d5b', textDecoration: 'none', cursor: 'pointer' }}
          >
            UnityRent
          </Typography>

          {/* 2. SEARCH SECTION */}
          <Box className="search-wrapper" sx={{ display: 'flex', alignItems: 'center', bgcolor: '#f1f3f4', px: 2, borderRadius: '20px', flexGrow: 0.5, mx: 4 }}>
            <SearchIcon fontSize="small" sx={{ color: '#5f6368', mr: 1 }} />
            <InputBase 
              placeholder="Search for cycles, books, tech..." 
              fullWidth 
              value={searchQuery} 
              onChange={handleSearch} 
              sx={{ fontSize: '0.9rem' }} 
            />
          </Box>

          {/* 3. NAV LINKS & UTILS */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: '15px', mr: 2 }}>
              {pages.map((page) => (
                <Button key={page} sx={{ color: '#333', textTransform: 'none', fontWeight: 600 }}>
                  {page}
                </Button>
              ))}
            </Box>

            {/* PRODUCT ICON - NAVIGATES TO THE FULL PAGE FORM */}
            <Tooltip title="List an Item">
              <IconButton onClick={() => navigate('/add-product')} sx={{ color: '#002d5b' }}>
                <PostAddIcon fontSize="medium" />
              </IconButton>
            </Tooltip>

            <GoogleTranslate />

            {/* USER PROFILE */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)} sx={{ p: 0, ml: 1 }}>
                  <Avatar alt="User" sx={{ width: 35, height: 35, bgcolor: '#002d5b' }}>M</Avatar>
                </IconButton>
              </Tooltip>
              <Menu 
                sx={{ mt: '45px' }} 
                anchorEl={anchorElUser} 
                open={Boolean(anchorElUser)} 
                onClose={() => setAnchorElUser(null)}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => setAnchorElUser(null)}>
                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;