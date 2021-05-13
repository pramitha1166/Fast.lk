import React, { Component } from "react";
import { FaShoppingCart } from "react-icons/fa";
import "./../../styles/Product.css";

const ProductCard = ({ image }) => {
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
          <h4 class="card-title">Card title</h4>
          <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <div className="card_buttons">
          <button class="btn btn-danger btn-round">
            Add to cart {" "}<FaShoppingCart /> 
          </button>
          <button class="btn btn-danger btn-link" style={{fontWeight: "bold"}}>Rs 1200.00</button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
