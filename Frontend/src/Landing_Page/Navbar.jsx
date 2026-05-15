import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory'; // For Products
import { Link } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, InputBase, IconButton, useRadioGroup } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PostAddIcon from '@mui/icons-material/PostAdd';
import GoogleTranslate from './GoogleTranslate.jsx'; 
import Login from './SignIn/Login.jsx';
import './Navbar.css';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import MessageIcon from '@mui/icons-material/Message';

// No need to import AddNewProduct here anymore since it's a separate page now!

const pages = [
  { name: 'Home', path: '/', icon: <HomeIcon /> },
  { name: 'Browse', path: '/about', icon: <SearchIcon /> },
  { name: 'Messages', path: '/messages', icon: <MessageIcon /> },
  { name: 'Dashboard', path: '/dashboard', icon: <PersonIcon /> },
  { name: 'About Us', path: '/about-us', icon: <InfoIcon /> },
  
];
const settings = ['Profile', 'My Rentals', 'Logout'];

function Navbar() {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState("");


  // const userPhone = localStorage.getItem("userPhone");
  const {userData, backendUrl, setUserData, setIsLoggedin} = useContext(AppContext)
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // send verification otp for verify email (isAccVerified)
  const sendVerificationOtp = async()=>{
    try{
      axios.defaults.withCredentials = true  // send cookies

      const {data} = await axios.post(backendUrl + '/api/auth/send-verify-otp')
      if(data.success){
        navigate('/email-verify')
        toast.success(data.message)
      }else{
        toast.error(data.message)
      }
    }catch(error){
      toast.error(error.message)
    }
  }

// logout function
  const logout = async()=>{
    try{
      axios.defaults.withCredentials = true  // send cookies
      const {data} = await axios.post(backendUrl + '/api/auth/logout')
      data.success && setIsLoggedin(false)  // if data.success is true
      data.success && setUserData(false)
      navigate('/') // navigate to home page

    }catch(error){
      toast.error(error.message)
    }
  }

  return (
    <AppBar position="sticky" className="navbar-main" sx={{ bgcolor: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          
          {/* 1. LOGO SECTION */}
          <Typography 
            variant="h5" 
            noWrap 
            onClick={() => navigate('/')} // Navigate home on click
            sx={{ fontWeight: 800, color: '#002d5b', textDecoration: 'none', cursor: 'pointer', paddingLeft: '70px' }}
          >
            UnityRent
          </Typography>

        

          {/* 3. NAV LINKS & UTILS */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            
              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: '30px', mr: 2, paddingRight: '9rem' }}>
                {pages.map((page) => (
                <Button 
                key={page} 
                // Add the onClick handler here
                onClick={() => navigate(page.path)}
                  // This adds the icon in front of the text
                  startIcon={page.icon}
                  sx={{ fontSize: '18px', color: '#333', textTransform: 'none', fontWeight: 700 }}
                  >
                  {page.name}
                </Button>
                ))}
              </Box>

          

         
            {/* <Tooltip title="List an Item">
              <IconButton onClick={() => navigate('/add-product')} sx={{ color: '#002d5b' }}>
                <PostAddIcon fontSize="medium" />
              </IconButton>
            </Tooltip> */}

            {/* Icons only visible if user data exists */}
            {userData && (
              <>
                <Button component={Link} to="/cart" startIcon={<ShoppingCartIcon />} sx={{ color: '#002d5b' }} />
                <Tooltip title="List an Item">
                  <IconButton onClick={() => navigate('/add-product')} sx={{ color: '#002d5b' }}>
                    <PostAddIcon fontSize="medium" />
                  </IconButton>
                </Tooltip>
              </>
            )}

            <GoogleTranslate />


  {/*  Profile icon and login button  */}
            {userData ? (
              <Box>
                <Tooltip title="Open settings">
                  <Avatar
                    sx={{
                      bgcolor: '#002d5b',
                      cursor: 'pointer',
                      width: 35,
                      height: 35,
                      fontSize: '1rem',
                    }}
                    onClick={(e) => setAnchorElUser(e.currentTarget)}
                  >
                    {userData.name[0].toUpperCase()}
                  </Avatar>
                </Tooltip>

                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {/* 1. Profile Option */}
                  <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/profile'); }}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>

                  {/* 2. Verify Email Option (Conditional) */}
                  {!userData.isAccVerified && (
                    <MenuItem onClick={() => { sendVerificationOtp() }}>
                      <Typography textAlign="center">Verify Email</Typography>
                    </MenuItem>
                  )}

                  {/* 3. Logout Option */}
                  <MenuItem 
                    onClick={() => { 
                      logout();
                    }}
                  >
                    <Typography textAlign="center" color="error">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Button
                variant="contained"
                onClick={() => navigate('/login')}
                sx={{
                  bgcolor: '#002d5b',
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: '8px',
                  '&:hover': { bgcolor: '#004080' },
                }}
              >
                Login
              </Button>
            )}


       
             
</Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;