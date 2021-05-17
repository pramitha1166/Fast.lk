import "./App.css";

import React, {useState} from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/layout/Nevbar";
import Home from "./components/Home/Home";
import Footer from "./components/layout/Footer";
import Login from "./components/Login/Login";
import SellerLogin from "./components/Login/SellerLogin";
import Signup from "./components/Signup/Signup";
import SellerSignup from "./components/Signup/SellerSignup";
import Contact from "./components/Contact/Contact";
import Products from './components/Products/Products';
import Checkout from "./components/Checkout/Checkout";
import BuyItem from './components/BuyItem/BuyItem';
import CartContextProvider from "./components/context/CartContextProvider";
import BuyerRoute from "./components/auth/BuyerRoute";
import Dashboard from "./components/Seller/Dashboard";

function App() {

  const [cartItems, setCartItems] = useState([
    {
      _id: 1,
      img: "https://th.bing.com/th/id/OIP.wycFRpdMjTifD1dm4v2S9wHaE8?w=277&h=185&c=7&o=5&pid=1.7",
      price: 50,
      quantity: 2,
      name:'Adddas Shoes'
    },
    {
      _id: 2,
      img: "https://th.bing.com/th/id/OIP.uPZMFcCEz61U_eD1eZcQoAAAAA?w=249&h=191&c=7&o=5&pid=1.7",
      price: 20,
      quantity: 3,
      name:'Adddas Cap'
    },
    {
      _id: 3,
      img: "https://th.bing.com/th/id/OIP.sAetjRQQ8XKV2a2h2yTmsgHaJ-?w=182&h=245&c=7&o=5&pid=1.7",
      price: 40,
      quantity: 5,
      name:'Adddas Bag'
    },
    {
      _id: 4,
      img: "https://th.bing.com/th/id/OIP.sAetjRQQ8XKV2a2h2yTmsgHaJ-?w=182&h=245&c=7&o=5&pid=1.7",
      price: 40,
      quantity: 5,
      name:'Adddas t-Shirt'
    },
  ]);

  return (
    <CartContextProvider cartData={cartItems}>
      <Router>
      {" "}
      <div className="App">
        <Route path="/" exec component={Navbar} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/slogin" exact component={SellerLogin} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/ssignup" exact component={SellerSignup} />
          <Route path="/contact" exact component={Contact}></Route>
          <Route path="/products" exact component={Products}></Route>
          <Route path="/checkout" exact component={Checkout}></Route>
          <Route path="/buy" exact component={BuyItem}></Route>
          <BuyerRoute path="/buyer" component={Dashboard}></BuyerRoute>
        </Switch>
        <Route path="/" exec component={Footer} />
      </div>
    </Router>
    </CartContextProvider>
  );
}

export default App;
