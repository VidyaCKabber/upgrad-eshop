// Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import './Navbar.css'; // Create this CSS file to style the navigation bar
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar className="navbar-container">
        <div className="left-section">
          <ShoppingCartIcon />
          <Typography variant="h6" className="eshop-name">
            UpGrad E-Shop
          </Typography>
        </div>
        <div className="right-section">
          <a to="/login" className="nav-link">
            Login
          </a>
          <a to="/signup" className="nav-link">
            Signup
          </a>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
