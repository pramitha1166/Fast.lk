import React, { useEffect, useState, useContext } from "react";
import LoaderSpinner from "./../Comman/LoaderSpinner";
import { CartContext } from "./../../context/CartContext";
import { useAlert } from 'react-alert';
import {
  AiOutlineArrowDown,
  AiFillPlusSquare,
  AiFillMinusSquare,
} from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import "rc-slider/assets/index.css";

import Pagination from "./../Comman/Pagination";
import { LoginContext } from "./../../context/LoginContext";
import ItemCarousel from "./ItemCarousel";

import "./../../App.css";
import "./../../styles/Buy.css";

const BuyItem = (props) => {
  const [cartData, setCartData] = useContext(CartContext);
  const [buyDataState, setBuyDataState] = useState(undefined);
  const [islLoggedIn, setIslLoggedIn] = useContext(LoginContext);
  const [count, setCount] = useState(1);

  const alert = useAlert();

  useEffect(() => {
    window.scroll(0, 0);
    const buyData = JSON.parse(localStorage.getItem("buyingData"));
    
    if(islLoggedIn.status !== "buyer"){
      props.history.push("/login");
    }
  }, []);

  const addToCart = () => {
    setCartData((previousCart) => [
      ...previousCart,
      {
        _id: new Date(),
        img: JSON.parse(localStorage.getItem("buyingData")).images[0],
        price: JSON.parse(localStorage.getItem("buyingData")).price,
        quantity: count,
      },
    ]);
    alert.success('Added to the cart!')
  };

  const increment = () => {
    setCount(previous => previous+1);
  }

  
  const decrement = () => {
    if(count > 1){
      setCount(previous => previous-1);
    }else{

    }
  }

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
                    <ItemCarousel images={JSON.parse(localStorage.getItem("buyingData")).images}/>
                  </div>
                </div>
                <div class="col-lg-6 col-sm-12 col-md-12">
                  <div style={{ marginTop: 23 }}>
                    <h4 style={{ textAlign: "left" }}>{JSON.parse(localStorage.getItem("buyingData")).name}</h4>
                    <div className="reset">
                      <h3>Rs {JSON.parse(localStorage.getItem("buyingData")).price}</h3>
                    </div>
                  </div>
                  <div>
                    <div className="reset">
                      <h6 className="text-danger">Description</h6>
                      <AiOutlineArrowDown />
                    </div>
                  </div>
                  <h5 style={{ textAlign: "left" }}>
                  {JSON.parse(localStorage.getItem("buyingData")).discription}
                  </h5>
                  <div>
                    <div className="reset">
                      <h6 className="text-danger">Seller</h6>
                      <h6 style={{ textAlign: "right" }}>Derby distributers</h6>
                    </div>
                    <div className="buyerButton">
                      <div className="qtyButton">
                        <AiFillMinusSquare onClick={decrement}/>
                        <h4
                          style={{
                            fontWeight: "bold",
                            marginLeft: 10,
                            marginRight: 10,
                          }}
                        >
                          {count}
                        </h4>
                        <AiFillPlusSquare  onClick={increment}/>
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
