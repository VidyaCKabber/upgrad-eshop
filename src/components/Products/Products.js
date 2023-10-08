import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import CategoryFilter from '../../common/components/CategoryFilter/CategoryFilter';
import { Autocomplete, TextField, Card, CardContent, CardActions, Button, IconButton, Typography, Grid, InputAdornment, alertClasses } from '@mui/material/';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { LocalActivity, Search as SearchIcon } from '@mui/icons-material';
import './Products.css';
import { Snackbar, SnackbarContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// For dialog box
import Backdrop from '@mui/material/Backdrop';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import Modal from '@mui/material/Modal';
//import { useTheme } from '@mui/material/styles';


const sortingOptions = [
  { value: 'default', label: 'Default' },
  { value: 'priceHighToLow', label: 'Price: High to Low' },
  { value: 'priceLowToHigh', label: 'Price: Low to High' },
  { value: 'newest', label: 'Newest' },
];


function Products() {
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSorting, setSelectedSorting] = useState(sortingOptions[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [userRole, setUserRole] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isModifyAlertOpen, setIsModiyfAlertOpen] = useState(false);  
  const [isOrderAlertOpen, setIsOrderAlertOpen] =useState(false);
  const [diaologOpen, setdiaologOpen] =useState(false);
  const [displayProd, setDisplayProd] = useState('');
  const [deletedProduct,setDeletedProduct] = useState('');
  //const theme = useTheme();
  //const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () =>{
    setdiaologOpen(false);
  }
  const handleDeleteProduct = () => {
    setdiaologOpen(true);
  };

  const showDeletedALert = () => {
    setdiaologOpen(false);
    setIsAlertOpen(true);
  }
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsAlertOpen(false);
  };
  const handleModifyCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsModiyfAlertOpen(false);
    localStorage.removeItem('modifiedProductName');
  };
  const handleOrderCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsOrderAlertOpen(false);
    localStorage.removeItem('OrderPlaced');
  };
  const getAllProducts = () => {
    fetch(`http://localhost:8080/api/products`)
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setAllProducts(data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }

  useEffect(() => {
    // getAllCatagories();
    const params = new URLSearchParams(location.search);
    const query = params.get('search');
    if (query) {
      // Perform a search based on the query
      setSearchQuery(query);
    }
  }, [location.search]);

  const getAllCatagories = () => {
    fetch('http://localhost:8080/api/products/categories')
      .then(response => response.json())
      .then(data => {
        const uniqueValues = Array.from(new Set(data.map(item => item.toLowerCase()))).map(item => item.charAt(0).toUpperCase() + item.slice(1));
        uniqueValues.unshift("ALL")
        setCategories(uniqueValues)
      })
      .catch(error => console.error('Error fetching categories:', error));
  }
  // Fetch categories from /products/categories
  useEffect(() => {
    const loggedInUserRole = localStorage.getItem('loggedInUserRole');
    setUserRole(loggedInUserRole);
    const loginToken = localStorage.getItem('loginToken');
    if (loginToken === '' || loginToken === undefined || loginToken === null) {
      navigate('/signin')
    }
    getAllCatagories();
  }, []);

  useEffect(() => {
    const modifiedProduct = localStorage.getItem('modifiedProductName');
    if (modifiedProduct != null){
      setDisplayProd(modifiedProduct);
      setIsModiyfAlertOpen(true);
    }
    const orderPlaced = localStorage.getItem('OrderPlaced')
    if (orderPlaced != null){
      //setDisplayProd(modifiedProduct);
      setIsOrderAlertOpen(true);
    }
    getAllProducts();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filteredProducts = allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setProducts(filteredProducts);
    } else {
      getAllProducts();
    }
  }, [searchQuery]);

  const handleSortingChange = (newValue) => {
    setSelectedSorting(newValue); // Update the selectedSorting state
    fetch(`http://localhost:8080/api/products`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (newValue.value === "priceHighToLow") {
          // Use Array.sort() to sort the data by price in ascending order
          const filteredProducts = [...data].sort((a, b) => b.price - a.price);
          setProducts(filteredProducts);
        } else if (newValue.value === "priceLowToHigh") {
          // Use Array.sort() to sort the data by price in ascending order
          const filteredProducts = [...data].sort((a, b) => a.price - b.price);
          setProducts(filteredProducts);
        }
        else if (newValue.value === "newest") {
          const filteredProducts = [...data]; // Copy the data array
          filteredProducts.reverse();
          setProducts(filteredProducts);
        }
        else {
          getAllProducts();
        }
      })
      .catch(error => console.error('Error fetching products:', error));
  };

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
    // Depending on the newCategory value, you can filter products accordingly
    // Fetch products based on the selected category
    if (newCategory === "ALL") {
      getAllProducts();
    } else {
      //getAllProducts();
      const filteredProducts = allProducts.filter(item => item.category.toLowerCase() === newCategory.toLowerCase());
      setProducts(filteredProducts);
    }
  };

  const handleBuyProduct = (productId) =>{
    
    const loginToken = localStorage.getItem('loginToken').trim();
    console.log('loginToken:', loginToken);
    if(loginToken === '' || loginToken === "null" || loginToken === "undefined"){
      alert("Please login to buy the Product");
      navigate('/signin')
    } else {
      navigate(`/productDetails/${productId}`);
    }
  }

  return (
    <div>
      <div className="available-catagories">
        <CategoryFilter onCategoryChange={handleCategoryChange} />
      </div>
      <div className="sorting-dropdown">
        <Typography>Sort By : </Typography>
        <Autocomplete
          options={sortingOptions}
          value={selectedSorting} // Controlled by selectedSorting state
          onChange={(event, newValue) => handleSortingChange(newValue)} // Pass selected value to handleSortingChange
          getOptionLabel={option => option.label}
          style={{ width: 300 }}
          disableClearable={true}
          renderInput={params => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="Search..."
            />
          )}
        />
      </div>
      <div className="products-container">
        <Grid container spacing={3} >
          {products.map(product => (
            <Grid item xs={4} key={product.id}>
              <Card className="product-card-container">
                <CardContent>
                  <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '200px' }} /><br />
                  <br /><div className="row-container">
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="subtitle1">₹ {product.price}</Typography>
                  </div>
                  <br />
                  <Typography>{product.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#3f51b5' }}
                    onClick={() => handleBuyProduct(product.id)}
                  >
                    Buy
                  </Button>
                  {userRole === "ADMIN" ?
                    <div>
                      <div style={{ marginLeft: 'auto' }}>
                        <IconButton aria-label="edit" component={Link} to={`/modifyProduct/${product.id}`}>
                        <EditIcon />  
                        </IconButton>
                        <IconButton aria-label="delete" onClick={handleDeleteProduct} >
                          <DeleteIcon />
                        </IconButton>
                      </div>                      
                    </div>
                    :
                    null
                  }

                </CardActions>
             
                <Dialog
                        open={diaologOpen}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        slots={{ backdrop: Backdrop }}
                        slotProps={{
                          backdrop: {
                            sx: {
                              boxShadow: "none",
                              backgroundColor: 'rgba(128, 128, 128, 0.1)',
                            },
                          },
                        }}
                      >
                        <DialogTitle id="alert-dialog-title">
                           {"Confirm deletion of the product!"}
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                              Are you sure you want to delete the product?
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={showDeletedALert} variant="contained" style={{ backgroundColor: '#3f51b5' }}>
                              OK
                            </Button>
                            <Button variant="outlined" onClick={handleClose}>
                              CANCEL
                            </Button>
                            </DialogActions>
                  </Dialog>
                  <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={isAlertOpen}
                        onClose={handleCloseAlert}
                      >
                        <SnackbarContent
                          style={{ backgroundColor: '#00de00', color: 'white', display: 'flex', justifyContent: 'space-between' }} // Customize background color
                          message={
                            <span>
                              Product {deletedProduct} deleted successfully
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
                  <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={isModifyAlertOpen}
                        onClose={handleModifyCloseAlert}
                        >
                        <SnackbarContent
                          style={{ backgroundColor: '#00de00', color: 'white', display: 'flex', justifyContent: 'space-between' }} // Customize background color
                          message={
                            <span>
                              Product {displayProd} modified successfully
                              <IconButton
                                size="small"
                                aria-label="close"
                                color="inherit"
                               onClick={handleModifyCloseAlert}
                              >
                                <CloseIcon fontSize="small" />
                              </IconButton>
                            </span>
                          }
                        />
                      </Snackbar>
                      <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={isOrderAlertOpen}
                        onClose={handleOrderCloseAlert}
                        >
                        <SnackbarContent
                          style={{ backgroundColor: '#00de00', color: 'white', display: 'flex', justifyContent: 'space-between' }} // Customize background color
                          message={
                            <span>
                              Order placed successfully
                              <IconButton
                                size="small"
                                aria-label="close"
                                color="inherit"
                               onClick={handleOrderCloseAlert}
                              >
                                <CloseIcon fontSize="small" />
                              </IconButton>
                            </span>
                          }
                        />
                      </Snackbar>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default Products;
