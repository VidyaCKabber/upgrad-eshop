import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SignIn from './components/SignIn/SignIn.js';
import SignUp from './components/SignUp/SignUp.js';
import Navbar from './components/Navbar/Navbar.js';
import Products from './components/Products/Products.js';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Navbar />
    <Products />
  </BrowserRouter>
);
