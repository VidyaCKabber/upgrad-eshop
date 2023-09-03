// SignIn.js
import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar.js';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Grid from '@mui/material/Grid'; // Import the Grid component
import Card from '@mui/material/Card'; // Import the Card component
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.css';
import { SignalCellularNullRounded } from '@mui/icons-material';


const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State for handling errors
  const [authenticated, setAuthenticated] = useState(false);


  const handleSignIn = async () => {
    try {

      setError(null);

      if (!email || !password) {
        setError('Email and password are required.');
        return;
      }

      const signInData = {
        username: email,
        password: password,
      };

      await fetch('http://localhost:8080/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signInData),
      })
        .then(response => {
          const authToken = response.headers.get('x-auth-token');
          console.log(authToken);
          if (authToken !== '' && authToken !== undefined && authToken !== null) {
            localStorage.setItem('loginToken', authToken);
            setAuthenticated(true);
          }
        })
        .catch(error => setError('Email and password are does not match.'));
    } catch {
      setError('An error occurred. Please try again.');
      return;
    }
  };

  useEffect(() => {
    // Navigate to the products page when authenticated 
    if (authenticated) {
      navigate('/products');
    }
  }, [authenticated]);

  return (

    <div className="signin-container">
      <div className="centered-content">
        <div className="circular-container">
          <LockOutlinedIcon className="lock-icon" />
        </div>
        <Typography variant="h6" gutterBottom>
          Sign In
        </Typography>
        <div className="signin-fields-container" style={{ width: '400px' }}>
          <Grid>
            <Card>
              <TextField
                label="Email ID"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
              />
              {error && <div className="error-message">{error}</div>}
              <Button
                variant="contained"
                color="primary"
                onClick={handleSignIn}
                fullWidth
                sx={{ mt: 2 }}
              >
                SIGN IN
              </Button>
            </Card>
          </Grid>
        </div>
      </div>
      <div className="signup-link">
        <Link to="/signup" className="signup-link">
          Don't have an account? Sign up
        </Link>
      </div>
    </div>
  );
};

export default SignIn;