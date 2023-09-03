import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Autocomplete, TextField, ToggleButton, ToggleButtonGroup, Card, CardContent, CardActions, Button, IconButton, Typography, Grid } from '@mui/material/'; 
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './Products.css';


const sortingOptions = [
  { value: 'default', label: 'Default' },
  { value: 'priceHighToLow', label: 'Price High to Low' },
  { value: 'priceLowToHigh', label: 'Price Low to High' },
  { value: 'newest', label: 'Newest' },
];


function Products() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortingOption, setSortingOption] = useState('default');
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [sortingDirection, setSortingDirection] = useState('asc');
    const [selectedSorting, setSelectedSorting] = useState(sortingOptions[0]);

    
    const sortProducts = (option) => {
        const sortedProducts = [...selectedProducts];

        switch (option) {
            case 'default':
                // No need to sort, as products are already in default order
                break;
            case 'priceHighToLow':
                sortedProducts.sort((a, b) => (sortingDirection === 'asc' ? b.price - a.price : a.price - b.price));
                break;
            case 'priceLowToHigh':
                sortedProducts.sort((a, b) => (sortingDirection === 'asc' ? a.price - b.price : b.price - a.price));
                break;
            case 'newest':
                sortedProducts.sort((a, b) => (sortingDirection === 'asc' ? new Date(b.dateModified) - new Date(a.dateModified) : new Date(a.dateModified) - new Date(b.dateModified)));
                break;
            default:
                break;
        }
        setSelectedProducts(sortedProducts);
    }

    useEffect(() => {
        sortProducts(sortingOption);
    }, [sortingOption, sortingDirection]);

  const getAllCatagories = () => {
    fetch('http://localhost:8080/api/products/categories')
      .then(response => response.json())
      .then(data => { 
        const uniqueValues = Array.from(new Set(data.map(item => item.toLowerCase()))).map(item => item.charAt(0).toUpperCase() + item.slice(1));
        setCategories(uniqueValues)
      })
      .catch(error => console.error('Error fetching categories:', error));
  }
  // Fetch categories from /products/categories
  useEffect(() => {
    const loginToken = localStorage.getItem('loginToken');
    if (loginToken === '' || loginToken === undefined || loginToken === null){
        navigate('/signin')
    }
    getAllCatagories();
  }, []);

  // // Fetch products based on selected category and sorting option
  // useEffect(() => {
  //   fetch(`http://localhost:8080/api/products?category=${selectedCategory}&sort=${sortingOption}`)
  //     .then(response => response.json())
  //     .then(data => selectedProducts(data))
  //     .catch(error => console.error('Error fetching products:', error));
  // }, [selectedCategory, sortingOption]);

  const handleCategoryChange = (event, newCategory) => {
    fetch(`http://localhost:8080/api/products`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const filteredProducts = data.filter(item => item.category.toLowerCase() === newCategory.toLowerCase());
        setProducts(filteredProducts);
      })
      .catch(error => console.error('Error fetching products:', error));
  };

  const handleSortingChange = (_, newValue) => {
    setSelectedSorting(newValue);
  };

  const handleSearch = () => {
    // Perform search with selectedSorting.value and other logic
  };

  const getAllProducts = () => {
    fetch(`http://localhost:8080/api/products`)
    .then(response => response.json())
    .then(data => setProducts(data))
    .catch(error => console.error('Error fetching products:', error));
  }
  useEffect(() => {
    getAllProducts();
  }, []);

  
  return (
    <div>
      <div className="available-catagories">
          <ToggleButtonGroup value={selectedCategory} exclusive onChange={handleCategoryChange}>
              {categories.map(category => (
                  <ToggleButton key={category} value={category}>
                      {category}
                  </ToggleButton>
              ))} 
          </ToggleButtonGroup>
      </div>
      <div className="sorting-dropdown">
        <Typography>Sort By :</Typography>
        <Autocomplete
          options={sortingOptions}
          value={selectedSorting}
          onChange={handleSortingChange}
          getOptionLabel={option => option.label}
          style={{ width: 300 }}
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
                    <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '200px'}} />
                  <div className="row-container">
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="subtitle1">₹ {product.price}</Typography>
                  </div>
                  <Typography>{product.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button variant="contained" color="primary">
                  <Link to={`/productDetails/${product.id}`}>Buy</Link>
                  </Button>
                  <div style={{ marginLeft: 'auto' }}>
                    <IconButton aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default Products;
