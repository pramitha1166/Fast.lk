import "./App.css";

import React, {useState} from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/layout/Nevbar";
import Home from "./components/Home/Home";
import Footer from "./components/layout/Footer";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import SellerLogin from "./components/Login/SellerLogin";
import Signup from "./components/Signup/Signup";
import SellerSignup from "./components/Signup/SellerSignup";
import Contact from "./components/Contact/Contact";
import Products from "./components/Products/Products";
import Checkout from "./components/Checkout/Checkout";
import BuyItem from './components/BuyItem/BuyItem';
import Dashboard from "./components/Seller/Dashboard";
import AddProduct from "./components/AddProduct/AddProduct";


import { LoginProvider } from "./context/LoginContext";
import { CartProvider } from "./context/CartContext";
import SellerRoute from "./components/auth/SellerRoute";
import BuyerRoute from "./components/auth/BuyerRoute";
//import {ThemeProvider} from "./context/ThemeContext";

function App() {

  return (
      <Router>
      {" "}
      <div className="App">
        {/* <ThemeProvider> */}
        <LoginProvider>
          <CartProvider>
            <Route path="/" exec component={Navbar} />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" exact component={Login} />
              <Route path="/slogin" exact component={SellerLogin} />
              <Route path="/profile" exact component={Profile} />
              <Route path="/signup" exact component={Signup} />
              <Route path="/addproduct" exact component={AddProduct} />
              <Route path="/ssignup" exact component={SellerSignup} />
              <Route path="/contact" exact component={Contact}></Route>
              <Route path="/products" exact component={Products}></Route>
              <Route path="/checkout" exact component={Checkout}></Route>
              <Route path="/buy" exact component={BuyItem}></Route>
              <SellerRoute path="/seller" component={Dashboard}></SellerRoute>
            </Switch>
            <Route path="/" exec component={Footer} />
          </CartProvider>
        </LoginProvider>
        {/* </ThemeProvider> */}
      </div>
    </Router>
  );
}

export default App;
