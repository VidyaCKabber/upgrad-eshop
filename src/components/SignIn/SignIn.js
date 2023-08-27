// SignIn.js
import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar.js';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Grid from '@mui/material/Grid'; // Import the Grid component
import Card from '@mui/material/Card'; // Import the Card component
import Typography from '@mui/material/Typography';
import { Link,useNavigate } from 'react-router-dom';
import './SignIn.css';


const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State for handling errors
  const [authenticated, setAuthenticated] = useState({});

  //const changeAuthentication = () =>{
  //  
  //}
  const handleSignIn = async () => {
    try {
      // console.log(authenticated);
      // setAuthenticated(true);
      // console.log(authenticated);
      // if(authenticated === true){
      //   navigate("/products")
      // }

      
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
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if(data.length !== 0){
            setAuthenticated(data); 
          } 
        })
       .catch(error => setError('Email and password are does not match.'));

        // Below lines can be deleted, it was used for debugging purpose ###
        //console.log("Value of authentication "+authenticated);
        //console.log("Token :"+authenticated.token);
        
        if (authenticated.token !=='' && authenticated.token !== undefined){
          alert(authenticated.token)
          navigate("/products");
        }
               
        } 
        catch (error) {
      setError('An error occurred. Please try again.');
    }
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