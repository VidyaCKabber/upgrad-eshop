import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SignIn from './components/SignIn/SignIn.js';
import SignUp from './components/SignUp/SignUp.js';
import Navbar from './components/Navbar/Navbar.js';
import Home from './components/Home/Home.js';
import Products from './components/Products/Products.js';
import ProductDetails from './components/Products/ProductDetails.js';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';

export default function App() {
  return (  
  <BrowserRouter>
  <Navbar/>
  <Home />
    <Routes>
      <Route exact path ="/products" element={<Products />}></Route>
      <Route exact path ="/productDetails" element={<ProductDetails />}></Route>
      <Route exact path="/signin" element={<SignIn />}></Route>
      <Route exact path="/signup" element={<SignUp />}></Route>
      <Route exact path="/" element={<Home />}></Route>
    </Routes>
  </BrowserRouter>);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<App />
);
