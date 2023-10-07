import React, { useEffect, useState } from 'react';
import {
  Typography,
  TextField,
  Button,
} from '@mui/material';
import './ProductDetails.css';
import { useParams, useNavigate, Link } from 'react-router-dom';
import CategoryFilter from '../../common/components/CategoryFilter/CategoryFilter';


function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProductDetails] = useState([]);
  const [enteredQuantity, setEnteredQuantity] = useState(1); // Initialize with 1

  useEffect(() => {
    const loginToken = localStorage.getItem('loginToken').trim();
    console.log('loginToken:', loginToken);
    if(loginToken === '' || loginToken === "null" || loginToken === "undefined"){
      alert("Please login to buy the Product");
      navigate('/signin');
    }
  });

  useEffect(() => {
    localStorage.setItem('selectedProductId', id);
    localStorage.setItem('quantity',enteredQuantity);
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

  // Function to handle quantity input change
  const handleQuantityChange = (event) => {
    const newQuantity = event.target.value;
    setEnteredQuantity(newQuantity);
    localStorage.setItem('quantity',newQuantity);
  }

  return (
    <div item xs={3} key="1">
      <CategoryFilter onCategoryChange={handleCategoryChange} />
      {product.map(p => (
        <div className="product-details-container" key={p.id}>
          <div className="product-details-card">
            <div className="card-content">
              <div className="left-content">
                <img
                  src={p.imageUrl} // Replace with your actual image source
                  alt={p.name}
                  className="product-image"
                  style={{ width: '200px', height: '300px' }}
                />
              </div>
              <div className="right-content">
                <div className="row-container">
                  <Typography variant="h6">{p.name}</Typography>
                  <div className="available-quantity">
                    Available Quantity: <span className="quantity-number">{p.availableItems}</span>
                  </div>
                </div><br />
                <Typography>Category: {p.category}</Typography><br />
                <Typography>{p.description}</Typography><br />
                <Typography variant="h6">₹ {p.price}</Typography><br />
                <TextField
                  label="Enter Quantity"
                  variant="outlined"
                  fullWidth
                  type="number"
                  inputProps={{ min: 1 }}
                  value={enteredQuantity}
                  onChange={handleQuantityChange}
                /><br /><br />
                <Button
                  variant="contained"
                  style={{ color: 'white', backgroundColor: '#3f51b5', textDecoration: 'none' }}
                  disabled={enteredQuantity < 1 || enteredQuantity > p.availableItems}
                >
                  <Link to="/placeOrder">
                  Place Order
                  </Link>
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
