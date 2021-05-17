import React, { useEffect, useState, useContext } from "react";
import LoaderSpinner from "./../Comman/LoaderSpinner";
import { CartContext } from "./../../context/CartContext";
import {
  AiOutlineArrowDown,
  AiFillPlusSquare,
  AiFillMinusSquare,
} from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import "rc-slider/assets/index.css";

import Pagination from "./../Comman/Pagination";
import ItemCarousel from "./ItemCarousel";

import "./../../App.css";
import "./../../styles/Buy.css";

const BuyItem = () => {
  const [cartData, setCartData] = useContext(CartContext);
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const addToCart = () => {
    setCartData((previousCart) => [
      ...previousCart,
      {
        _id: 2,
        img: "https://th.bing.com/th/id/OIP.uPZMFcCEz61U_eD1eZcQoAAAAA?w=249&h=191&c=7&o=5&pid=1.7",
        price: 20,
        quantity: 3,
      },
    ]);
  };

  return (
    <>
      <div
        class="page-header header-filter smooth_load"
        data-parallax="true"
        style={{
          backgroundImage: "url('../assets/img/bg6.jpg')",
          height: 400,
        }}
      >
        <div className="container">
          <h1 className="title">Leading Shopping Plaform.</h1>
          <h4>
            Every landing page needs a small description after the big bold
            title, that&apos;s why we added this text here. Add here all the
            information that can make you or your product create the first
            impression.
          </h4>
          <br />
        </div>
      </div>
      <div class="main main-raised">
        <div>
          <>
            <div className="container smooth_load">
              <div class="row">
                <div class="col-lg-6 col-sm-12 col-md-12">
                  <div style={{ padding: 50 }}>
                    <ItemCarousel />
                  </div>
                </div>
                <div class="col-lg-6 col-sm-12 col-md-12">
                  <div style={{ marginTop: 23 }}>
                    <h4 style={{ textAlign: "left" }}>Items Name</h4>
                    <div className="reset">
                      <h3>Rs 1200.00</h3>
                    </div>
                  </div>
                  <div>
                    <div className="reset">
                      <h6 className="text-danger">Description</h6>
                      <AiOutlineArrowDown />
                    </div>
                  </div>
                  <h5 style={{ textAlign: "left" }}>
                    Every landing page needs a small description after the big
                    bold title, that&apos;s why we added this text here. Add
                    here all the information that can make you or your product
                    create the first impression.
                  </h5>
                  <div>
                    <div className="reset">
                      <h6 className="text-danger">Seller</h6>
                      <h6 style={{ textAlign: "right" }}>Derby distributers</h6>
                    </div>
                    <div className="buyerButton">
                      <div className="qtyButton">
                        <AiFillMinusSquare />
                        <h4
                          style={{
                            fontWeight: "bold",
                            marginLeft: 10,
                            marginRight: 10,
                          }}
                        >
                          12
                        </h4>
                        <AiFillPlusSquare />
                      </div>
                      <button class="btn btn-danger" onClick={addToCart}>
                        Add to cart <FaShoppingCart />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default BuyItem;
