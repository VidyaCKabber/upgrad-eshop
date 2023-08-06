// SignIn.js
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Grid from '@mui/material/Grid'; // Import the Grid component
import Card from '@mui/material/Card'; // Import the Card component
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import './SignIn.css';


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Handle sign-in logic here, e.g., make API requests or authentication checks
    console.log('Email:', email);
    console.log('Password:', password);
  };

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
              <Button
                variant="contained"
                color="primary"
                onClick={handleSignIn}
                fullWidth
                sx={{ mt: 2 }}
              >
                Sign Up
              </Button>
            </Card>
          </Grid>
        </div>
      </div>
      <div className="signup-link">
        <Link to="/SignUp/SignUp.js" className="signup-link">
          Don't have an account? Sign up
        </Link>
      </div>
    </div>
  );
};

export default SignIn;