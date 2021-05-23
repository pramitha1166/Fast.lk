import React, { useState, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { LoginContext } from "./../../context/LoginContext";
import { CartContext } from "./../../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import { FaRecycle } from "react-icons/fa";
import { useAlert } from "react-alert";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { MdDeleteForever } from "react-icons/md";
import { FaStoreAlt } from "react-icons/fa";

import "./Navbar.css";

const Navbar = ({ history }) => {
  const [showCart, setShowCart] = useState(false);
  const [islLoggedIn, setIslLoggedIn] = useContext(LoginContext);
  const [cartData, setCartData] = useContext(CartContext);

  const alert = useAlert();

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

  const removeFromCart = (e) => {
    const removedItemId = e.target.id;
    if (removedItemId.length > 0) {
      setCartData((previousData) => [
        ...previousData.filter((cartData) => cartData._id != removedItemId),
      ]);
      alert.success("Succesfully removed!");
    }
  };

  const clearCart = () => {
    setCartData([]);
  };

  const Logout = (e) => {
    e.preventDefault();
    confirmAlert({
      title: "Confirm logout",
      message: "Are you sure want to logout?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            localStorage.clear();
            setIslLoggedIn({
              login: false,
              status: undefined,
            });
            history.push("/");
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  let total = 0;
  let total_items = 0;

  const cart = () => (
    <div>
      <div className="cart" style={isShowCart()}>
        <div className="cart-container">
          <h3>Shopping Cart</h3>
          <div
            className="cartModify"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <ul
              style={{ overflowY: "scroll", height: "77vh" }}
              className="ul_style"
            >
              {cartData.map((item, id) => {
                total = total + item.quantity * item.price;
                // total_items = total_items + item.quantity;
                return (
                  <li className="cart_row" style={{ padding: 3 }}>
                    <div className="image">
                      <img src={item.img}></img>
                    </div>

                    <div>
                      <p>
                      {item.name} | {item.quantity} item |{" "}
                        Rs.{" "}{item.quantity * item.price} 
                      </p>
                    </div>

                    <button
                      class="btn btn-danger btn-round"
                      id={item._id}
                      style={{ padding: 5, marginTop: -5, fontSize: 8 }}
                      onClick={removeFromCart}
                    >
                      remove
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="cart-bottum">
              <h4>Total Rs. {" "}{total}</h4>
              <button class="btn btn-danger" onClick={clearCart}>
                Clear <FaRecycle />
              </button>

              <Link to={cartData.length > 0 ? "/checkout" : "/products"}>
                <button class="btn btn-danger" onClick={buttonClickCart}>
                  Checkout <FaShoppingCart />
                </button>
              </Link>
            </div>
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
              <a class="navbar-brand" href="!#" style={{ fontSize: 25 }}>
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
              {!islLoggedIn.login ? (
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
              ) : null}
              {islLoggedIn.status === "buyer" ? (
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
              ) : null}

              {islLoggedIn.status === "seller" ? (
                <Link to="/addproduct">
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      href="https://www.creative-tim.com/product/material-kit-pro"
                      target="_blank"
                    >
                      Sell Now
                    </a>
                  </li>
                </Link>
              ) : null}

              {!islLoggedIn.login ? (
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
              ) : (
                <Link to="/profile">
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      href="https://www.creative-tim.com/product/material-kit-pro"
                      target="_blank"
                    >
                      Account
                    </a>
                  </li>
                </Link>
              )}
              {!islLoggedIn.login ? (
                <Link to="/signup">
                  <li class="nav-item">
                    <a class="nav-link" href="!#" target="_blank">
                      Signup
                    </a>
                  </li>
                </Link>
              ) : (
                <li class="nav-item" onClick={Logout}>
                  <a class="nav-link" href="#!" target="_blank">
                    Logout
                  </a>
                </li>
              )}

              {islLoggedIn.status === "buyer" ? (
                <li className="nav-item">
                  <a className="nav-link" onClick={buttonClickCart}>
                    <i className="fa fa-shopping-basket"></i>
                    <span class="badge badge-danger">{cartData.length}</span>
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default withRouter(Navbar);
