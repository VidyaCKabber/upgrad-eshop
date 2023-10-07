import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Grid,Card, CardContent, Typography} from "@mui/material"
import { useState } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './ConfirmOrder.css'
import { Height } from '@mui/icons-material';

const steps = ['Items', 'Select Address', 'Confirm Order'];

function ConfirmOrder(){
    const navigate = useNavigate();
    const [address, setAddress] = useState('');
    const [activeStepCount, setActiveStepCount] = useState(2);
    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [desc, setDesc] =useState('');
    const [unitPrice, setUnitPrice] = useState('');

    const handleStepBack =() =>{
        //const oductID =localStorage.getItem('selectedProductId');
        navigate("/placeOrder");
    }
    const handleStepNext = () => {
        
       
    }

    useEffect(()=>{
        const selectedAddress =localStorage.getItem('selectedAddress');
        const selectedProduct = localStorage.getItem('selectedProductId');
        const quantity = localStorage.getItem('quantity');
        console.log("Address "+ selectedAddress)
        console.log("Product "+ selectedProduct);
        setAddress(selectedAddress);
        setProduct(selectedProduct);
        setQuantity(quantity);
            fetch(`http://localhost:8080/api/products/${selectedProduct}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setProduct(data.name);
                    setCategory(data.category);
                    setDesc(data.description);
                    setUnitPrice(data.price);
                    //setProductDetails(previousData => [...previousData, data]);
                })
                .catch(error => console.error('Error fetching product details:', error));
    },[])
    

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
        {activeStepCount === 1 ? (
                    <div>
                       
                    </div>
                ) : (
                    <center>
                    <div className='product-container'>

                    <Grid container justifyContent="center">
                        <Grid  item xs={6}>
                            <Card className="product-card-container" style={{height :'350px'}}>
                                <CardContent>
                                    <Typography variant='h5' align='left'>{product}</Typography><br></br>
                                    <Typography variant='subtitle1' align='left'> Quantity : {quantity} </Typography><br></br>
                                    <Typography variant='subtitle2' align='left'> Categrory : {category} </Typography><br></br>
                                    <Typography variant='subtitle2' align='left'> {desc} </Typography><br></br>
                                    <Typography variant='h6' align='left' color={'red'}>Total Price :{unitPrice*quantity} </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card  style={{height :'350px'}}>
                                <CardContent>
                                    <Typography variant='h5' align='left'>Address Details :</Typography>
                                    <Typography variant='subtitle1' align='left'> {address} </Typography><br></br>
                                </CardContent>   
                            </Card>
                        </Grid>
                    </Grid>
                      
                    <div >
                        
                        <Button sx={{marginTop : 5}}
                            color="primary"
                            //disabled={false /*activeStepCount === 1 || activeStepCount ===2 */}
                            onClick={handleStepBack}>
                            Back
                        </Button>
                        <Button sx={{marginTop : 5, marginLeft :2}}
                            variant="contained"
                            color="primary"
                            onClick={handleStepNext}>
                            PLACE ORDER
                        </Button>
                            
                    </div>
                    </div>
                    </center>
                )}

    </div>
    );

}

export default ConfirmOrder;