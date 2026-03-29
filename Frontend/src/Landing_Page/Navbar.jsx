import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, InputBase, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import './Navbar.css';

const pages = ['Home', 'Browse', 'About Us', 'Contact'];
const settings = ['Profile', 'My Rentals', 'Logout'];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  return (
    <AppBar position="sticky" className="navbar-main">
      <Container maxWidth="xl">
        <Toolbar disableGutters className="toolbar-flex">
          
          {/* 1. LOGO SECTION */}
          <div className="logo-section">
            <Typography variant="h6" noWrap component="a" href="/" className="brand-logo">
               UnityRent
            </Typography>
          </div>

          {/* 2. SEARCH SECTION  */}
          <div className="search-wrapper">
            <div className="search-icon-box">
              <SearchIcon fontSize="small" />
            </div>
            <InputBase
              placeholder="Search items..."
              className="search-field"
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>

          {/* 3. SPACER  */}
          <Box sx={{ flexGrow: 0.1 }} />

          {/* 4. NAV LINKS SECTION */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: '20px', mr: 4 }}>
            {pages.map((page) => (
              <Button key={page} className="nav-item-link">
                {page}
              </Button>
            ))}
          </Box>

          {/* 5. USER PROFILE */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)} sx={{ p: 0 }}>
                <Avatar alt="User" sx={{ width: 35, height: 35, bgcolor: '#ddd', fontSize: '1rem', color: '#555' }}>U</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser} // menu stick to the Avatar
                  anchorOrigin={{
                   vertical: 'top',
                   horizontal: 'right',
                 }}
                 keepMounted
                 transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                 }}
                open={Boolean(anchorElUser)} //  the menu is open
                onClose={() => setAnchorElUser(null)} // Closes the menu 
            >
             {settings.map((setting) => (
             <MenuItem key={setting} onClick={() => setAnchorElUser(null)}>
             <Typography sx={{ textAlign: 'center', px: 2 }}>{setting}</Typography>
            </MenuItem>
             ))}
          </Menu>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;