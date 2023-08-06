// SignIn.js
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'; // Use this for routing to the sign-up page
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
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
      <div className="circular-container">
        <LockOutlinedIcon className="lock-icon" />
      </div>
      
      <h1>Sign In</h1>
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

        sx={{ mt: 2 }}
      >
        Sign In
      </Button>
      <a className="signup-link">
        Don't have an account? Sign up
      </a>
    </div>
  );
};

export default SignIn;
