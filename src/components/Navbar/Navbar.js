import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, TextField, IconButton, InputAdornment } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Search as SearchIcon } from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';


const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [authToken, setAuthToken] = useState('');

  // useEffect(() => {
  //   const authToken = localStorage.getItem('loginToken');
  //   if (authToken !== '' && authToken !== undefined && authToken !== null) {
  //     setIsLoggedIn(true);
  //     navigate('/products');
  //   } else {
  //     setIsLoggedIn(false);
  //     navigate('/signin');
  //   }
  // }, []);

  useEffect(() => {
    console.log("======updated==========" + isLoggedIn);
    const auth_token = localStorage.getItem('loginToken');
    setAuthToken(auth_token);
    if (auth_token === '' || auth_token === undefined || auth_token == null) {
      setIsLoggedIn(false);
      navigate('/signin');
    } else {
      setIsLoggedIn(true);
      navigate('/products');
    }
  }, [authToken])

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      // Navigate to the Products page with the search query as a URL parameter
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    } else {
      // Navigate to the Products page without a search query
      navigate('/products');
    }
  };

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
          {isLoggedIn === true && location.pathname !== '/signin' ?
            <div className="search-container">
              <TextField
                variant="outlined"
                placeholder="Search..."
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton onClick={handleSearch}>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            :
            null
          }

        </div>
        <div className="right-section">
          {isLoggedIn === true && (location.pathname !== '/signin') ? (
            <div>
              <Link to="/home" className="nav-link">
                Home
              </Link>
              <Link to="/addproduct" className="nav-link">
                Add Product
              </Link>
              <Link to="/logout" className="nav-link">
                Logout
              </Link>
            </div>
          )
            :
            (
              <div>
                <Link to="/signin" className="nav-link">
                  Login
                </Link>
                <Link to="/signup" className="nav-link">
                  SignUp
                </Link>
              </div>
            )
          }
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

