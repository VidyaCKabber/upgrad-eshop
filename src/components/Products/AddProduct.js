import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import {Button, IconButton, Select, MenuItem} from '@mui/material';
import Grid from '@mui/material/Grid'; 
import Card from '@mui/material/Card'; 
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { Snackbar, SnackbarContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './AddProduct.css';

const AddProduct=()=> {
    //const navigate = useNavigate();
    const categories = ['Furniture', 'Apparel', 'Electronics', 'Footwear', 'PersonalCare'];
    const [productName, setProductName] =useState('');
    const [category, setCategory] =useState('');
    const [manufacturer, setManufacturer] =useState('');
    const [availableItems, setAvailableItems] =useState('');
    const [price, setPrice] =useState('');
    const [imageURL, setImageURL] =useState('');
    const [productDesc, setProductDesc] =useState('');
    const [error, setError] = useState('');
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setIsAlertOpen(false);
      };

    const handleAddProduct = async ()=>{
        try{
            const loginToken = localStorage.getItem('loginToken');
            //const productID = localStorage.getItem('selectedProductId');
        if (!productName || !category || !manufacturer || !availableItems || !price) {
            setError('All inputs are required.');
            return;
          }

          // Construct the data object for the API request
          const userData ={
            name: productName,
            category: category,
            price: price,
            description: productDesc,
            manufacturer: manufacturer,
            availableItems: availableItems,
            imageURL: imageURL,
          };

          await fetch('http://localhost:8080/api/products',
          {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': loginToken
          },
          body: JSON.stringify(userData),
          })
          .then(response => response.json())
          .then(data =>{
            console.log(data);
            //navigate(`/productDetails/${productID}`)
            //navigate('/products');
            setIsAlertOpen(true);

          })
          .catch(error => console.log(error));

        }
        catch (error) {
            setError('An error occurred. Please try again.');
          } 
    }


    return(
        <div className='addProduct-container'>
            <div className='centered-container'>
                <Typography variant="h6" gutterBottom marginTop={'20px'}>
                    Add Product
                </Typography>
            </div>
            <div className='addProduct-fields-container' style={{width: '400px'}}>
                <Grid>
                    <Card>
                        <TextField
                        label="Name *"
                        variant="outlined"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        fullWidth
                        margin="normal"
                        />
                        <label>
                        <Select labelId="category-select-label" defaultValue="" style={{ width: '400px' }}
                        onChange={(e) => {
                            console.log("Current Selected Value : ", e.target.value)
                            setCategory(e.target.value)
                        }}
                        >
                        {categories.map((option, index) => (
                        <MenuItem key={index} value={option}>
                            {option}
                        </MenuItem>
                         ))}
                        </Select>
                        </label>
                        <TextField
                        label="Manufacturer *"
                        variant="outlined"
                        value={manufacturer}
                        onChange={(e) => setManufacturer(e.target.value)}
                        fullWidth
                        margin="normal"
                        />
                        <TextField
                        label="Available Items *"
                        variant="outlined"
                        value={availableItems}
                        onChange={(e) => setAvailableItems(e.target.value)}
                        fullWidth
                        margin="normal"
                        />
                        <TextField
                        label="Price *"
                        variant="outlined"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        fullWidth
                        margin="normal"
                        />
                        <TextField
                        label="Image URL"
                        variant="outlined"
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                        fullWidth
                        margin="normal"
                        />
                        <TextField
                        label="Product Description"
                        variant="outlined"
                        value={productDesc}
                        onChange={(e) => setProductDesc(e.target.value)}
                        fullWidth
                        margin="normal"
                        />
                        {error && <div className="error-message">{error}</div>}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddProduct}
                            fullWidth
                            sx={{ mt: 2 }}
                            style={{ backgroundColor: '#3f51b5' }}
                        >
                            SAVE PRODUCT
                        </Button>
                        <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={isAlertOpen}
                        onClose={handleCloseAlert}
                      >
                        <SnackbarContent
                          style={{ backgroundColor: '#00de00', color: 'white', display: 'flex', justifyContent: 'space-between' }} // Customize background color
                          message={
                            <span>
                              Product {productName} added successfully
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
                    </Card>
                </Grid>
            </div>

        </div>
    );

}

export default AddProduct;