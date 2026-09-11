import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  InputBase,
  IconButton,
  Button
} from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GoogleTranslate from './GoogleTranslate.jsx';
import './Navbar.css';

function Navbar({ refreshProducts }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorElCategory, setAnchorElCategory] = useState(null);
  const [anchorElAccount, setAnchorElAccount] = useState(null);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      if (searchQuery.trim()) {
        navigate(`/about?search=${encodeURIComponent(searchQuery)}`);
      }
    }
  };

  return (
    <AppBar position="sticky" elevation={0} className="navbar-main">
      <div className="navbar-container">
        <Toolbar disableGutters className="navbar-toolbar">
          {/* 1. BRAND LOGO */}
          <Box className="navbar-brand" onClick={() => navigate('/')}>
            <div className="brand-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3H5.5L7.2 14.3C7.3 15.1 8 15.7 8.8 15.7H18.5C19.3 15.7 20 15.1 20.1 14.3L21.5 6.5H6.5" stroke="#063b28" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="9" cy="19.5" r="1.5" fill="#063b28" />
                <circle cx="18" cy="19.5" r="1.5" fill="#063b28" />
                <path d="M11 10L13 12L17 8" stroke="#063b28" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <Typography variant="h6" className="brand-title">
              UnityRent
            </Typography>
          </Box>

          {/* 2. NAVIGATION LINKS */}
          <Box className="nav-links">
            <Button
              className="nav-link-btn"
              endIcon={<KeyboardArrowDownIcon className="dropdown-arrow" />}
              onClick={(e) => setAnchorElCategory(e.currentTarget)}
            >
              Categories
            </Button>
            <Menu
              anchorEl={anchorElCategory}
              open={Boolean(anchorElCategory)}
              onClose={() => setAnchorElCategory(null)}
            >
              <MenuItem onClick={() => { setAnchorElCategory(null); navigate('/about'); }}>All Items</MenuItem>
              <MenuItem onClick={() => { setAnchorElCategory(null); navigate('/about?cat=electronics'); }}>Electronics & Tech</MenuItem>
              <MenuItem onClick={() => { setAnchorElCategory(null); navigate('/about?cat=cycles'); }}>Cycles & Mobility</MenuItem>
              <MenuItem onClick={() => { setAnchorElCategory(null); navigate('/about?cat=appliances'); }}>Home Appliances</MenuItem>
              <MenuItem onClick={() => { setAnchorElCategory(null); navigate('/about?cat=books'); }}>Books & Stationery</MenuItem>
            </Menu>

            <Button className="nav-link-btn" onClick={() => navigate('/about?filter=deals')}>
              Browse All
            </Button>

            <Button className="nav-link-btn" onClick={() => navigate('/allservices')}>
              Services
            </Button>

            <Button className="nav-link-btn" onClick={() => navigate('/add-product')}>
              List Item
            </Button>

            <Button className="nav-link-btn" onClick={() => navigate('/about?filter=new')}>
              About Us
            </Button>
          </Box>

          {/* 3. SEARCH BAR (Pill shape with icon on right) */}
          <Box className="navbar-search-pill">
            <InputBase
              placeholder="Search Product"
              className="search-input"
              value={searchQuery}
              onChange={handleSearch}
              onKeyDown={handleSearchSubmit}
            />
            <IconButton className="search-icon-btn" onClick={handleSearchSubmit}>
              <SearchIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* 4. RIGHT ACTION UTILITIES */}
          <Box className="navbar-actions">
            {/* Google Translate widget */}
            <div className="action-item translate-item">
              <GoogleTranslate />
            </div>

            {/* Account */}
            <Button
              className="action-btn"
              startIcon={<PersonOutlineIcon />}
              onClick={(e) => setAnchorElAccount(e.currentTarget)}
            >
              Account
            </Button>
            <Menu
              anchorEl={anchorElAccount}
              open={Boolean(anchorElAccount)}
              onClose={() => setAnchorElAccount(null)}
            >
              <MenuItem onClick={() => { setAnchorElAccount(null); navigate('/login'); }}>Login / Sign Up</MenuItem>
              <MenuItem onClick={() => { setAnchorElAccount(null); navigate('/cart'); }}>My Rentals</MenuItem>
            </Menu>

            {/* Cart */}
            <Button
              className="action-btn"
              startIcon={<ShoppingCartOutlinedIcon />}
              onClick={() => navigate('/cart')}
            >
              Cart
            </Button>
          </Box>
        </Toolbar>
      </div>
    </AppBar>
  );
}

export default Navbar;