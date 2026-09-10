import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  InputBase,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PostAddIcon from '@mui/icons-material/PostAdd';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import BuildIcon from '@mui/icons-material/Build';
import SecurityIcon from '@mui/icons-material/Security';
import SchoolIcon from '@mui/icons-material/School';
import BusinessIcon from '@mui/icons-material/Business';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import GoogleTranslate from './GoogleTranslate.jsx';
import { AppContext } from '../context/AppContext.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';
import './Navbar.css';

// Slack Multi-Color Logo Icon
const SlackLogoIcon = () => (
  <svg width="26" height="26" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M26.5 75C32.3 75 37 70.3 37 64.5V26.5C37 20.7 32.3 16 26.5 16C20.7 16 16 20.7 16 26.5C16 32.3 20.7 37 26.5 37H37V64.5C37 70.3 32.3 75 26.5 75Z" fill="#E01E5A" />
    <path d="M45 26.5C45 20.7 49.7 16 55.5 16C61.3 16 66 20.7 66 26.5V64.5C66 70.3 61.3 75 55.5 75C49.7 75 45 70.3 45 64.5V26.5Z" fill="#36C5F0" />
    <path d="M93.5 45C87.7 45 83 49.7 83 55.5V93.5C83 99.3 87.7 104 83 93.5C99.3 104 104 99.3 104 93.5C104 87.7 99.3 83 93.5 83H83V55.5C83 49.7 87.7 45 93.5 45Z" fill="#2EB67D" />
    <path d="M75 93.5C75 99.3 70.3 104 64.5 104C58.7 104 54 99.3 54 93.5V55.5C54 49.7 58.7 45 64.5 45C70.3 45 75 49.7 75 55.5V93.5Z" fill="#ECB22E" />
  </svg>
);

function Navbar({ refreshProducts }) {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContext);

  // States for user profile menu
  const [anchorElUser, setAnchorElUser] = useState(null);

  // States for Slack nav dropdown menus
  const [featuresAnchor, setFeaturesAnchor] = useState(null);
  const [solutionsAnchor, setSolutionsAnchor] = useState(null);
  const [resourcesAnchor, setResourcesAnchor] = useState(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Demo dialog state
  const [isDemoDialogOpen, setIsDemoDialogOpen] = useState(false);
  const [demoEmail, setDemoEmail] = useState("");

  // Mobile drawer state
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);

  // User menu handlers
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  // Search submit
  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      if (searchQuery.trim()) {
        navigate(`/about?search=${encodeURIComponent(searchQuery)}`);
      }
    }
  };

  // Verification OTP trigger
  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp');
      if (data.success) {
        navigate('/email-verify');
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Logout handler
  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/logout');
      if (data.success) {
        setIsLoggedin(false);
        setUserData(false);
        navigate('/');
        toast.success("Logged out successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Demo submission handler
  const handleDemoSubmit = () => {
    if (demoEmail) {
      toast.success("Demo request received! Our team will contact you shortly.");
      setIsDemoDialogOpen(false);
      setDemoEmail("");
    } else {
      toast.error("Please enter a valid email address.");
    }
  };

  return (
    <header className="slack-header-wrapper">
      <div className="slack-navbar-capsule">
        {/* 1. BRAND LOGO */}
        <div className="slack-logo-box" onClick={() => navigate('/')}>
          <div className="slack-logo-icon-wrapper">
            <SlackLogoIcon />
          </div>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography className="slack-brand-text">UnityRent</Typography>
            <Typography className="slack-subbrand-text">from Unity</Typography>
          </Box>
        </div>

        {/* 2. NAVIGATION LINKS (DESKTOP) */}
        <nav className="slack-nav-links">
          <Button className="slack-nav-button" onClick={() => navigate('/')}>
            Home
          </Button>
          <Button className="slack-nav-button" onClick={() => navigate('/about')}>
            Browse
          </Button>
          <Button className="slack-nav-button" onClick={() => navigate('/messages')}>
            Messaging
          </Button>
          <Button className="slack-nav-button" onClick={() => navigate('/dashboard')}>
            Dashboard
          </Button>
          <Button className="slack-nav-button" onClick={() => navigate('/about-us')}>
            About Us
          </Button>
        </nav>

        {/* 3. UTILITIES & ACTIONS (RIGHT) */}
        <div className="slack-utilities">
          {/* Expandable Search */}
          <div className={`slack-search-box ${isSearchOpen ? 'open' : ''}`}>
            <IconButton
              className="slack-search-icon-btn"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <SearchIcon fontSize="small" />
            </IconButton>
            {isSearchOpen && (
              <InputBase
                placeholder="Search equipment..."
                className="slack-search-input"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchSubmit}
              />
            )}
          </div>

          {/* Google Translate Integration */}
          <GoogleTranslate />

          {/* GET STARTED / PROFILE Button */}
          {userData ? (
            <Box>
              <Tooltip title="Account settings">
                <Avatar
                  sx={{
                    bgcolor: '#611F69',
                    cursor: 'pointer',
                    width: 36,
                    height: 36,
                    fontSize: '0.95rem',
                    fontWeight: 700
                  }}
                  onClick={handleOpenUserMenu}
                >
                  {userData.name[0].toUpperCase()}
                </Avatar>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                classes={{ paper: 'slack-dropdown-paper' }}
              >
                <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/profile'); }}>
                  <Typography className="slack-dropdown-title">Profile</Typography>
                </MenuItem>
                {!userData.isAccVerified && (
                  <MenuItem onClick={() => { handleCloseUserMenu(); sendVerificationOtp(); }}>
                    <Typography className="slack-dropdown-title">Verify Email</Typography>
                  </MenuItem>
                )}
                <MenuItem onClick={() => { handleCloseUserMenu(); logout(); }}>
                  <Typography className="slack-dropdown-title" sx={{ color: '#d32f2f !important' }}>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button
              className="slack-btn-contained"
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
          )}

          {/* Mobile Menu Toggle Button */}
          <IconButton
            sx={{ display: { xs: 'flex', lg: 'none' }, color: '#1D1C1D', ml: 1 }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{ sx: { width: 300, p: 2 } }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography className="slack-brand-text">UnityRent</Typography>
          <IconButton onClick={() => setMobileOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List>
          <ListItem button onClick={() => { setMobileOpen(false); navigate('/'); }}>
            <ListItemText primary="Home" primaryTypographyProps={{ fontWeight: 700 }} />
          </ListItem>
          <ListItem button onClick={() => { setMobileOpen(false); navigate('/about'); }}>
            <ListItemText primary="Browse" primaryTypographyProps={{ fontWeight: 700 }} />
          </ListItem>
          <ListItem button onClick={() => { setMobileOpen(false); navigate('/messages'); }}>
            <ListItemText primary="Messaging" primaryTypographyProps={{ fontWeight: 700 }} />
          </ListItem>
          <ListItem button onClick={() => { setMobileOpen(false); navigate('/dashboard'); }}>
            <ListItemText primary="Dashboard" primaryTypographyProps={{ fontWeight: 700 }} />
          </ListItem>
          <ListItem button onClick={() => { setMobileOpen(false); navigate('/about-us'); }}>
            <ListItemText primary="About Us" primaryTypographyProps={{ fontWeight: 700 }} />
          </ListItem>
        </List>

        <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1.5 }}>

          {!userData ? (
            <Button
              className="slack-btn-contained"
              onClick={() => { setMobileOpen(false); navigate('/login'); }}
              fullWidth
            >
              Get Started
            </Button>
          ) : (
            <Button
              className="slack-btn-contained"
              onClick={() => { setMobileOpen(false); logout(); }}
              fullWidth
            >
              Logout
            </Button>
          )}
        </Box>
      </Drawer>

      {/* REQUEST A DEMO DIALOG */}
      <Dialog open={isDemoDialogOpen} onClose={() => setIsDemoDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800, color: '#1D1C1D' }}>Request a Demo</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Experience how UnityRent can transform equipment rentals for your team or campus. Enter your work email below:
          </Typography>
          <TextField
            autoFocus
            label="Work Email Address"
            type="email"
            fullWidth
            variant="outlined"
            size="small"
            value={demoEmail}
            onChange={(e) => setDemoEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setIsDemoDialogOpen(false)} sx={{ color: '#616061' }}>Cancel</Button>
          <Button className="slack-btn-contained" onClick={handleDemoSubmit}>
            Submit Request
          </Button>
        </DialogActions>
      </Dialog>
    </header>
  );
}

export default Navbar;