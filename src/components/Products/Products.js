import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Autocomplete, TextField, ToggleButton, ToggleButtonGroup, Card, CardContent, CardActions, Button, IconButton, Typography, Grid, InputAdornment } from '@mui/material/';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Search as SearchIcon } from '@mui/icons-material';
import './Products.css';


const sortingOptions = [
  { value: 'default', label: 'Default' },
  { value: 'priceHighToLow', label: 'Price High to Low' },
  { value: 'priceLowToHigh', label: 'Price Low to High' },
  { value: 'newest', label: 'Newest' },
];


function Products() {
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortingOption, setSortingOption] = useState('default');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [sortingDirection, setSortingDirection] = useState('asc');
  const [selectedSorting, setSelectedSorting] = useState(sortingOptions[0]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getAllCatagories();
    const params = new URLSearchParams(location.search);
    const query = params.get('search');
    if (query) {
      // Perform a search based on the query
      setSearchQuery(query);
    }
  }, [location.search]);

  useEffect(() => {
    if (searchQuery) {
      // Filter products based on the search query
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setProducts(filteredProducts);
    } else {
      // If the search query is empty, reset the product list to all products
      getAllProducts();
    }
  }, [searchQuery]);

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
    const loginToken = localStorage.getItem('loginToken');
    if (loginToken === '' || loginToken === undefined || loginToken === null) {
      navigate('/signin')
    }
    getAllCatagories();
  }, []);

  const handleCategoryChange = (event, newCategory) => {
    fetch(`http://localhost:8080/api/products`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (newCategory === "ALL") {
          getAllProducts();
        } else {
          const filteredProducts = data.filter(item => item.category.toLowerCase() === newCategory.toLowerCase());
          setProducts(filteredProducts);
        }
      })
      .catch(error => console.error('Error fetching products:', error));
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
