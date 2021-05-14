import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { FaStoreAlt } from "react-icons/fa";

import "./Navbar.css";

const Navbar = ({ history }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      _id: 1,
      img: "https://th.bing.com/th/id/OIP.wycFRpdMjTifD1dm4v2S9wHaE8?w=277&h=185&c=7&o=5&pid=1.7",
      price: 50,
      quantity: 2,
    },
    {
      _id: 2,
      img: "https://th.bing.com/th/id/OIP.uPZMFcCEz61U_eD1eZcQoAAAAA?w=249&h=191&c=7&o=5&pid=1.7",
      price: 20,
      quantity: 3,
    },
    {
      _id: 3,
      img: "https://th.bing.com/th/id/OIP.sAetjRQQ8XKV2a2h2yTmsgHaJ-?w=182&h=245&c=7&o=5&pid=1.7",
      price: 40,
      quantity: 5,
    },
    {
      _id: 4,
      img: "https://th.bing.com/th/id/OIP.sAetjRQQ8XKV2a2h2yTmsgHaJ-?w=182&h=245&c=7&o=5&pid=1.7",
      price: 40,
      quantity: 5,
    },
  ]);

  const buttonClickCart = () => {
    setShowCart(!showCart);
  };

  const isActive = (history, path) => {
    if (history.location.pathname === path) {
      return { color: "#e11b0c" };
    } else {
      return { color: "#000000" };
    }
  };

  const isShowCart = () => {
    if (showCart) {
      return { left: "0px" };
    } else {
      return { left: "-450px" };
    }
  };

  let total = 0;
  let total_items = 0;

  const cart = () => (
    <div>
      <div className="cart" style={isShowCart()}>
        <div className="cart-container">
          <h3>Shopping Cart</h3>
          <ul>
            {cartItems.map((item, id) => {
              total = total + item.quantity * item.price;
              total_items = total_items + item.quantity;
              return (
                <li>
                  <div className="image">
                    <img src={item.img}></img>
                  </div>
                  <div className="content">
                    <p>
                      {item.quantity} item | {item.quantity * item.price}${" "}
                    </p>
                  </div>
                  <div className="price">
                    <button className="btn btn-danger btn-sm">remove</button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="cart-bottum">
              <h4>Total {total}$</h4>
              <button className="btn btn-warning">Clear</button>
              <button className="btn btn-info"><Link to="/checkout">Checkout</Link></button>
          </div>
        </div>
        <span>
          <a href="#" onClick={buttonClickCart}>
            <i class="fa fa-times" aria-hidden="true"></i>
          </a>
        </span>
      </div>
    </div>
  );

  return (
    <>
      {cart()}
      <nav
        class="navbar navbar-transparent navbar-color-on-scroll fixed-top navbar-expand-lg"
        color-on-scroll="100"
        id="sectionsNav"
      >
        <div class="container">
          <div class="navbar-translate">
            <Link to="/">
            <a
              class="navbar-brand"
              href="!#"
              style={{fontSize: 25}}
            >
              Fast.lk{" "}
            </a>
            </Link>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="sr-only">Toggle navigation</span>
              <span class="navbar-toggler-icon"></span>
              <span class="navbar-toggler-icon"></span>
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>
          <div class="collapse navbar-collapse">
            <ul class="navbar-nav ml-auto">
              <Link to="/login">
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/product/material-kit-pro"
                  target="_blank"
                >
                  Login
                </a>
              </li>
              </Link>
              <Link to="/products">
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/product/material-kit-pro"
                  target="_blank"
                >
                   Products
                </a>
              </li>
              </Link>
              <li className="nav-item">
                <a className="nav-link" onClick={buttonClickCart}>
                  <i className="fa fa-shopping-basket"></i>
                  <span class="badge badge-default">{total_items}</span>
                </a>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default withRouter(Navbar);
