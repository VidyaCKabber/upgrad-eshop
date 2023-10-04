import React, { useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import {Button, IconButton, Select, MenuItem} from '@mui/material';
import Grid from '@mui/material/Grid'; 
import Card from '@mui/material/Card'; 
import Typography from '@mui/material/Typography';
import { useParams, useNavigate } from 'react-router-dom';
import { Snackbar, SnackbarContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './ModifyProduct.css'; 

export default function ModifyProduct(){
    const navigate= useNavigate();
    const [productName, setProductName] =useState('');
    const [category, setCategory] =useState('');
    const [manufacturer, setManufacturer] =useState('');
    const [availableItems, setAvailableItems] =useState('');
    const [price, setPrice] =useState('');
    const [imageURL, setImageURL] =useState('');
    const [productDesc, setProductDesc] =useState('');
    const [error, setError] = useState('');
    const { id } = useParams();
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setIsAlertOpen(false);
      }

    const handleModifyProduct = async () => {
        try{
            const productID = localStorage.getItem('modifyProductId');
            const loginToken = localStorage.getItem('loginToken');

            const userData ={
                name: productName,
                category: category,
                price: price,
                description: productDesc,
                manufacturer: manufacturer,
                availableItems: availableItems,
                imageURL: imageURL,
              };

            await fetch (`http://localhost:8080/api/products/${productID}`,
            {
                method :'PUT',
                headers :{
                    'Content-Type': 'application/json',
                    'x-auth-token': loginToken
                },
                body: JSON.stringify(userData)
            })
            .then(response => response.json())
                .then(data => {
                    console.log(data);  
                    //setIsAlertOpen(true);
                    localStorage.setItem('modifiedProductName',data.name);
                    navigate("/products");
                })
                .catch(error => console.log(error));

        } 
        catch{

        }

    }
    const getProductDetails = async () => {
        try{
            const productID = localStorage.getItem('modifyProductId');
            const loginToken = localStorage.getItem('loginToken');
            await fetch (`http://localhost:8080/api/products/${productID}`,
            {
                method :'GET',
                headers :{
                    'x-auth-token': loginToken
                }
            })
            .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setProductName(data.name);
                    setCategory(data.category);
                    setAvailableItems(data.availableItems);
                    setManufacturer(data.manufacturer);
                    setPrice(data.price);
                    setImageURL(data.imageUrl);
                    if(data.description === null){
                        setProductDesc('');
                    }
                    else {
                        setProductDesc(data.description);
                    }
                    if(data.imageUrl === null){
                        setImageURL('');
                    }
                    else {
                        setImageURL(data.imageUrl);
                    }
                    
                })
                .catch(error => console.log(error));
        }
        catch{

        } 
    }
    
    useEffect(() =>{
        localStorage.setItem('modifyProductId', id);
        console.log("Modify : "+localStorage.getItem('modifyProductId'));
        getProductDetails();
    },[id])
 
    return(
        <div className='modifyProduct-container'>
            <div className='centered-container'>
               <Typography variant="h6" gutterBottom marginTop={'20px'}>
                    Modify Product
                </Typography>
            </div>
            <div className='modifyProduct-fields-container' style={{width: '400px'}}>
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
                        <TextField
                        label="Category"
                        variant="outlined"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        fullWidth
                        margin="normal"
                        />
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
                            onClick={handleModifyProduct}
                            fullWidth
                            sx={{ mt: 2 }}
                            style={{ backgroundColor: '#3f51b5' }}
                        >
                            MODIFY PRODUCT
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
                              Product {productName} modified successfully
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