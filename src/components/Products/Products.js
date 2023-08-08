import React, { useState, useEffect } from 'react';
import { ToggleButton, ToggleButtonGroup, Card, CardContent, CardActions, Button, IconButton, Typography, Grid, Select, MenuItem } from '@mui/material/'; 
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './Products.css';

const availableCatagories = [
    {
      id: 1,
      name: 'All',
    },
    {
        id: 2,
        name: 'APPEARANCE',
    },
    {
        id: 3,
        name: 'ELECTRONICS',
    },
    {
        id: 4,
        name: 'PERSONAL CARE',
    },
];

const products = [
  {
    id: 1,
    name: 'Product 1',
    price: '$10.99',
    image: 'product1.jpg',
    details: 'Product details go here...Product details go here...Product details go here...Product details go here...Product details go here...Product details go here...Product details go here...Product details go here...Product details go here...',
  },
  {
    id: 2,
    name: 'Product 1',
    price: '$9.99',
    image: 'product1.jpg',
    details: 'Product details go here...',
  },
  {
    id: 3,
    name: 'Product 1',
    price: '$40',
    image: 'product1.jpg',
    details: 'Product details go here...',
  },
  {
    id: 4,
    name: 'Product 4',
    price: '$109.1',
    image: 'product1.jpg',
    details: 'Product details go here...',
  },
  // ...add more products
];



function Products() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortingOption, setSortingOption] = useState('default');
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [sortingDirection, setSortingDirection] = useState('asc');

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

  // Fetch categories from /products/categories
  useEffect(() => {
    fetch('http://localhost:8080/api/products/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  // Fetch products based on selected category and sorting option
  useEffect(() => {
    fetch(`http://localhost:8080/api/products?category=${selectedCategory}&sort=${sortingOption}`)
      .then(response => response.json())
      .then(data => setSelectedProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, [selectedCategory, sortingOption]);

  const handleCategoryChange = (event, newCategory) => {
    setSelectedCategory(newCategory);
  };

  const handleSortingChange = (event, newSortingOption) => {
    setSortingOption(newSortingOption);
  };


  return (
    <div>
        <div className="available-catagories">
            <ToggleButtonGroup value={selectedCategory} exclusive onChange={handleCategoryChange}>
                {availableCatagories.map(category => (
                    <ToggleButton key={category.id} value={category.id}>
                        {category.name}
                    </ToggleButton>
                ))} 
            </ToggleButtonGroup>
        </div>
        <div className="sort-items">
            <Select
                value={sortingOption}
                onChange={(event) => setSortingOption(event.target.value)}
                variant="outlined"
            >
                <MenuItem value="default">Default</MenuItem>
                <MenuItem value="priceHighToLow">Price High to Low</MenuItem>
                <MenuItem value="priceLowToHigh">Price Low to High</MenuItem>
                <MenuItem value="newest">Newest</MenuItem>
            </Select>
        </div>
      <Grid container spacing={3}>
        {products.map(product => (
          <Grid item xs={4} key={product.id}>
            <Card>
              <CardContent>
                <img src={product.image} alt={product.name} style={{ maxWidth: '100%' }} />
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="subtitle1">{product.price}</Typography>
                <Typography>{product.details}</Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary">
                  Buy
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
  );
}

export default Products;
