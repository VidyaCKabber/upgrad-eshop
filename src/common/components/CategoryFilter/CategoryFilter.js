import React, { useEffect, useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material/';

function CategoryFilter({ onCategoryChange }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the server and set them in the state
    fetch('http://localhost:8080/api/products/categories')
      .then(response => response.json())
      .then(data => {
        const uniqueValues = Array.from(new Set(data.map(item => item.toLowerCase())))
          .map(item => item.charAt(0).toUpperCase() + item.slice(1));
        uniqueValues.unshift("ALL");
        setCategories(uniqueValues);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleCategoryChange = (event, newCategory) => {
    // Notify the parent component (Products) about the category change
    onCategoryChange(newCategory);
  };

  return (
    <div className="available-catagories">
      <ToggleButtonGroup exclusive onChange={handleCategoryChange}>
        {categories.map(category => (
          <ToggleButton key={category} value={category}>
            {category}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}

export default CategoryFilter;
