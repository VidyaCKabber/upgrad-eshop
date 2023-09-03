import React,  {useState, useEffect} from 'react';
import { AppBar, Toolbar, Typography, TextField, IconButton, InputAdornment } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Search as SearchIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    const authToken = localStorage.getItem('loginToken');
    if (authToken !== '' && authToken !== undefined && authToken !== null) {
      setIsLoggedIn(true);
      navigate('/products');
    } else {
      setIsLoggedIn(false);
      navigate('/signin');
    }
  }, []);

  useEffect(() => {
    console.log("======updated=========="+ isLoggedIn);
  }, [isLoggedIn])

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
          { isLoggedIn ? (
            <div>
              <Link to="/home" className="nav-link">
                Home
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
