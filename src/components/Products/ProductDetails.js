import React, { useEffect, useState } from 'react';
import {
  Typography,
  TextField,
  Button,
} from '@mui/material';
import './ProductDetails.css';
import { useParams, useNavigate } from 'react-router-dom';
import CategoryFilter from './CategoryFilter'; 


function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [product, setProductDetails] = useState([]);

  useEffect(() => {
    localStorage.setItem('selectedProductId', id);
    // Fetch the product details based on the product ID
    fetch(`http://localhost:8080/api/products/${id}`)
      .then(response => response.json())
      .then(data => {
          console.log(data);
          setProductDetails(previousData => [...previousData, data]);
        })
      .catch(error => console.error('Error fetching product details:', error));
  }, [id]);

  if (!product) {
    // You can display a loading indicator or handle the case where the product data is not available yet
    return <div>Loading...</div>;
  } 

  const handleCategoryChange = (newCategory) => {
    navigate('/products');
  }

  return (
    <div item xs={1} key="1">
      <CategoryFilter onCategoryChange={handleCategoryChange} />
      {product.map(p => (
        <div className="product-details-container">
        <div className="product-details-card">
            <div className="card-content">
            <div className="left-content">
                <img
                src={p.imageUrl} // Replace with your actual image source
                alt={p.name}
                className="product-image"
                style={{ width: '200px', height: '300px'}}
                />
            </div>
            <div className="right-content">
                <div className="row-container">
                    <Typography variant="h6">{p.name}</Typography>
                    <div className="available-quantity">
                        Available Quantity: <span className="quantity-number">{p.availableItems}</span>
                    </div>
                </div><br/>
                <Typography>Category: {p.category}</Typography><br/>
                <Typography>{p.description}</Typography><br/>
                <Typography variant="h6">₹ {p.price}</Typography><br/>
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
      ))}
    </div>
  );
};

export default ProductDetails;
