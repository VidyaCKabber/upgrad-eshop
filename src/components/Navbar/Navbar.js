import React from 'react';
import { AppBar, Toolbar, Typography, TextField, IconButton, InputAdornment } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Search as SearchIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar className="navbar-container">
        <div className="left-section">
          <div>
            <ShoppingCartIcon />
          </div>
          <Typography variant="h6" className="eshop-name">
            UpGrad E-Shop
          </Typography>
          <div className="search-container">
              <TextField
                variant="outlined"
                placeholder="Search..."
                size="small"
                // onInput={(e) => {
                //   setSearchQuery(e.target.value);
                // }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
          </div>
        </div>
        <div className="right-section">
          <Link to="/login" className="nav-link">
            Login
          </Link>
          <Link to="/signup" className="nav-link">
            Signup
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
