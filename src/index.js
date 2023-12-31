import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SignIn from './components/SignIn/SignIn.js';
import SignUp from './components/SignUp/SignUp.js';
import Navbar from './components/Navbar/Navbar.js';
import Home from './components/Home/Home.js';
import Products from './components/Products/Products.js';
import PlaceOrder from './components/PlaceOrder/PlaceOrder.js'
import ProductDetails from './components/Products/ProductDetails.js';
import ConfirmOrder  from './components/ConfirmOrder/ConfirmOrder';
import Logout from './components/Logout/Logout.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddProduct from './components/Products/AddProduct.js';
import ModifyProduct from './components/Products/ModifyProduct.js'

export default function App() {
  return (  
  <BrowserRouter>
  <Navbar/>
  <Home />
    <Routes>
      <Route exact path ="/products" element={<Products />}></Route>
      <Route path="/productDetails/:id" element={<ProductDetails />}></Route>
      <Route exact path="/signin" element={<SignIn />}></Route>
      <Route exact path="/signup" element={<SignUp />}></Route>
      <Route exact path="/home" element={<Home />}></Route>
      <Route exact path="/placeOrder" element={<PlaceOrder />}></Route>
      <Route exact path="/addproduct" element={<AddProduct />}></Route>
      <Route exact path="/logout" element={<Logout />}></Route>
      <Route exact path="/confirmOrder" element={<ConfirmOrder />}></Route>
      <Route path="/modifyProduct/:id" element={<ModifyProduct />}></Route>
    </Routes>
  </BrowserRouter>);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<App />
);
