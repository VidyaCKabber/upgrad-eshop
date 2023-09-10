
export const getAllCatagories = () => {
    let uniqueValues = null;
    fetch('http://localhost:8080/api/products/categories')
      .then(response => response.json())
      .then(data => {
        uniqueValues = Array.from(new Set(data.map(item => item.toLowerCase()))).map(item => item.charAt(0).toUpperCase() + item.slice(1));
        uniqueValues.unshift("ALL")
      })
      .catch(error => console.error('Error fetching categories:', error));
    return uniqueValues;
  }

  export const getAllProducts = () => {
    let products = [];
    fetch(`http://localhost:8080/api/products`)
      .then(response => response.json())
      .then((data) => {
        products = data;
    })
      .catch(error => console.error('Error fetching products:', error));
    
    return products;
  }
  


