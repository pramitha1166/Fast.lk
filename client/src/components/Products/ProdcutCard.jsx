import React, { Component } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./../../styles/Product.css";

const ProductCard = ({ image, itemData, props }) => {
  const goToBuyPage = () => {
    localStorage.setItem("buyingData", JSON.stringify(itemData));
    props.history.push("/buy");
  }

  return (
    <div class="col-lg-4 col-sm-12 col-md-12">
      <div class="card">
        <img
          class="card-img-top"
          style={{ height: 320 }}
          src={image}
          rel="nofollow"
          alt="Card image cap"
        />
        <div class="card-body" style={{ height: "auto" }}>
          <h4 class="card-title">{itemData.name}</h4>
          <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p class="card-text">
          {itemData.discription}
          </p>
          <div className="card_buttons">
      
              <button class="btn btn-danger btn-round" onClick={goToBuyPage}>
                Add to cart <FaShoppingCart />
              </button>
              <button
                class="btn btn-danger btn-link"
                style={{ fontWeight: "bold" }}
              >
                Rs {itemData.price}
              </button>
     
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
