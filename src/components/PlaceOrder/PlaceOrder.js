import React, {useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import TextField from '@mui/material/TextField';
import {IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
//import { Stepper, Step, StepLabel } from "@material-ui/core";
import { Snackbar, SnackbarContent } from '@mui/material';
import Button from '@mui/material/Button';
import { Box, MenuItem, Select, FormControl, InputLabel, FormHelperText, Grid, Card } from "@mui/material";
import './PlaceOrder.css'

const steps = ['Items', 'Select Address', 'Confirm Order'];

//const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];


function PlaceOrder(){
    const navigate = useNavigate();
    const [activeStepCount, setActiveStepCount] = useState(1);
    const [name, setName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [landmark, setlandmark] = useState('');
    const [zipCode, setzipCode] = useState('');
    const [error, setError] = useState(null);
    const [addressArray,setaddressArray] = useState([]);
    const [address, setAddress] = useState('');
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setIsAlertOpen(false);
      }


    const handleStepBack =() =>{
        const productID =localStorage.getItem('selectedProductId');
        navigate(`/productDetails/${productID}`);
    }

    const handleChange = (event) => {
        console.log("Event "+event.target.value);
        const add = event.target.value;
        //console.log("Address "+ add);
        setAddress(add);
        let savedAddress = localStorage.getItem('selectedAddress');
        console.log("Address : "+ add);
        console.log("Saved Address : "+ savedAddress);
        if(savedAddress == null){
            localStorage.setItem("selectedAddress",add);
        }
        if(savedAddress!=null){
            localStorage.removeItem("selectedAddress");
            localStorage.setItem("selectedAddress",add);
        }
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Selected option:', address);
      };

  
    const handleStepNext = () => {
        
        if(address !== ''){
           // setActiveStepCount((prevActiveStep) => prevActiveStep + 1);
           navigate("/confirmOrder");
            
        }
        else{
            setIsAlertOpen(true);
        }
    };
    // Don't need back navigation, commenting below function
    // const handleStepBack = () => {
    //     setActiveStepCount((prevActiveStep) => prevActiveStep - 1);
    // };

    const getAddress = async () =>{
        try{
            const loginToken = localStorage.getItem('loginToken');
            await fetch ('http://localhost:8080/api/addresses',
            {
                method :'GET',
                headers :{
                    'x-auth-token': loginToken
                }
            })
            .then(response => response.json())
                .then(data => {
                    console.log(data);
                    //console.log("Address reterived : " + data.id);
                    console.log(data.length);
                    setaddressArray(data);
                })
                .catch(error => console.log(error));
        }
        catch{

        }
    }
    useEffect(()=>{
        getAddress();
    },[])
  
    const saveAddress = async () =>{
        try{
                if (!name || !contactNumber || !street || !city || !state || !zipCode) {
                    setError('All inputs are required.');
                    return;
                }
                
                //Construct data object for API request
                const addressData = {                        
                    name: name,
                    contactNumber: contactNumber,
                    city: city,
                    landmark: landmark,
                    street: street,
                    state: state,
                    zipcode: zipCode
                }
                
                const loginToken = localStorage.getItem('loginToken');

                // Make the API request to create address
                await fetch('http://localhost:8080/api/addresses',
                {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': loginToken
                    },
                    body: JSON.stringify(addressData),
                })
                .then(response => response.json())
                .then(data => {
                    //console.log(data);
                    console.log("Address ID : " + data.id);
                    setaddressArray([data]);
                    console.log(addressArray);
                    console.log(addressArray.length);
                })
                .catch(error => console.log(error));
            }
            catch(error){
                setError('An error occurred. Please try again.');
            }
        }


        
    return(
        
    <div style={{marginTop : 50}}>
        <Stepper activeStep ={activeStepCount}>
            {steps.map((label,index)=>{
                const stepProps ={};
                const labelProps = {};
                return( <Step key={label}{...stepProps}>
                    <StepLabel {...labelProps}>
                        {label}
                    </StepLabel>
                </Step>);
            })}
        </Stepper>        
        {activeStepCount === 2 ? (
                    <div>
                       
                    </div>
                ) : (
                    <center>
                    <div >

                    <Grid container justifyContent="center">
                    <Grid item xs={12} sm={6}>
                        <form onSubmit={handleSubmit}>
                            <FormControl fullWidth variant="outlined">
                            <InputLabel id="select-label">Select an option</InputLabel>
                            <Select
                                labelId="select-label"
                                id="select"
                                value={address}
                                onChange={handleChange}
                                label="Select address"
                            >
                                <MenuItem value="">
                                <em>None</em>
                                </MenuItem>
                                {addressArray.map((option, index) => (
                                <MenuItem key={index} value={option.id}>
                                    {option.city}
                                </MenuItem>
                                ))}
                            </Select>
                            </FormControl>
                        </form>
                    </Grid>
                    </Grid>



                        <br/>
                        <>-OR-</><br/><br/>
                        <>Add Address</>
                        <div className="address-container" style={{ width: '400px' }}>
                        <Grid>
                            <Card>
                                <TextField
                                    label="Name *"
                                    variant="outlined"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Contact Number *"
                                    variant="outlined"
                                    value={contactNumber}
                                    onChange={(e) => setContactNumber(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Street *"
                                    variant="outlined"
                                    value={street}
                                    onChange={(e) => setStreet(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                />
                                 <TextField
                                    label="City *"
                                    variant="outlined"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="State *"
                                    variant="outlined"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Landmark"
                                    variant="outlined"
                                    value={landmark}
                                    onChange={(e) => setlandmark(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Zip code *"
                                    variant="outlined"
                                    value={zipCode}
                                    onChange={(e) => setzipCode(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                />
                                </Card>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={saveAddress}
                                    fullWidth
                                    sx={{ mt: 2 }}
                                >
                                    SAVE ADDRESS
                                </Button>   
                        </Grid>
                        </div>
                    <div >
                        
                            <Button sx={{marginTop : 5}}
                                color="primary"
                                //disabled={false /*activeStepCount === 1 || activeStepCount ===2 */}
                                onClick={handleStepBack}
                                
                            >Back
                            </Button>
                            <Button sx={{marginTop : 5, marginLeft :2}}
                            variant="contained"
                            color="primary"
                            onClick={handleStepNext}>
                               NEXT
                            </Button>
                            <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={isAlertOpen}
                        onClose={handleCloseAlert}
                        >
                        <SnackbarContent
                          style={{ backgroundColor: '#FF5733 ', color: 'white', display: 'flex', justifyContent: 'space-between' }} // Customize background color
                          message={
                            <span>
                             Please select Address
                              <IconButton
                                size="small"
                                aria-label="close"
                                color="inherit"
                                onClick={handleCloseAlert}
                              >
                                <CloseIcon fontSize="small" />
                              </IconButton>
                            </span>
                          }
                        />
                      </Snackbar>
                    </div>
                    </div>
                    </center>
                )}

    </div>);
}

export default PlaceOrder;
  