import React from 'react';
import {
  Typography,
  TextField,
  Button,
} from '@mui/material';
import './ProductDetails.css'; // Import your CSS file for styling
import shoe from './shoe.jpg'; // Replace with your actual image import

const ProductDetails = () => {
  return (
    <div item xs={1} key="1">
        <div className="product-details-container">
        <div className="product-details-card">
            <div className="card-content">
            <div className="left-content">
                <img
                src={shoe} // Replace with your actual image source
                alt="Product"
                className="product-image"
                style={{ width: '200px', height: '300px'}}
                />
            </div>
            <div className="right-content">
                <div className="row-container">
                    <Typography variant="h6">Product Name</Typography>
                    <div className="available-quantity">
                        Available Quantity: <span className="quantity-number">10</span>
                    </div>
                </div><br/>
                <Typography>Category: Category Name</Typography><br/>
                <Typography>
                Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nulla volutpat tellus et felis suscipit, sit amet feugiat elit
                placerat.
                </Typography><br/>
                <Typography variant="h6">₹ 19.99</Typography><br/>
                <TextField
                label="Enter Quantity"
                variant="outlined"
                fullWidth
                type="number"
                inputProps={{ min: 1 }}
                /><br/><br/>
                <Button variant="contained" color="primary">
                Place Order
                </Button>
            </div>
            </div>
        </div>
        </div>
    </div>
  );
};

export default ProductDetails;
