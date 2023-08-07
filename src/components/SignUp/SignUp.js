// SignIn.js
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'; // Use this for routing to the sign-up page
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Grid from '@mui/material/Grid'; // Import the Grid component
import Card from '@mui/material/Card'; // Import the Card component
import Typography from '@mui/material/Typography';
import './SignUp.css';

const SignIn = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [contactnumber, setContactNumber] = useState('');

  const handleSignUp = async () => {
    // Construct the data object for the API request
    const userData = {
      email: email,
      role: ['user'], // Specify user role as needed
      password: password,
      firstName: firstname,
      lastName: lastname,
      contactNumber: contactnumber,
    };

    try {
      // Make the API request to sign up
      await fetch('http://localhost:8080/api/auth/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="signup-container">
      <div className="centered-content">
        <div className="circular-container ">
          <LockOutlinedIcon className="lock-icon" />
        </div>
        <Typography variant="h6" gutterBottom>
          Sign Up
        </Typography>
        <div className="signup-fields-container" style={{ width: '400px' }}>
          <Grid>
            <Card>
              <TextField
                label="First Name *"
                variant="outlined"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Last Name *"
                variant="outlined"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email Address*"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Password *"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Confirm Password *"
                variant="outlined"
                type="password"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Contact Number *"
                variant="outlined"
                type="number"
                value={contactnumber}
                onChange={(e) => setContactNumber(e.target.value)}
                fullWidth
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSignUp}
                fullWidth
                sx={{ mt: 2 }}
              >
                Sign Up
              </Button>
            </Card>
          </Grid>
        </div>
      </div>
      <div className="signin-link">
        <Link to="/SignIn/SignIn.js" className="signup-link">
          Already have an account? Sign in
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
