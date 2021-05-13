import React, { useEffect, useState } from "react";
import LoaderSpinner from "./../Comman/LoaderSpinner";
import { FaUndo } from "react-icons/fa";
import axios from "axios";
import "rc-slider/assets/index.css";

import Pagination from "./../Comman/Pagination";
import ItemCarousel from "./ItemCarousel";

import "./../../App.css";
import "./../../styles/Product.css";

const BuyItem = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    window.scroll(0,0);
    axios
      .get("/api/products/view?page=1&limit=4")
      .then((res) => {
        setItems(res.data.result.results);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

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
          {isLoading ? (
            <LoaderSpinner />
          ) : (
            <>
              <div className="container smooth_load">
                <div class="row">
                  <div class="col-lg-6 col-sm-12 col-md-12">
                    <div style={{ marginTop: 23 }}>
                      <h4 style={{ textAlign: "left" }}>Find what you need.</h4>
                      
                    </div>
                    <div>
                      <ItemCarousel />
                    </div>

                    <div className="gap">
                      <h6>Price Range</h6>
                    </div>
                    <div className="gap">
                      <h6>Categories</h6>
                    </div>
                  </div>
                  <div class="col-lg-6 col-sm-12 col-md-12">
                    <div class="card-deck">
                      {items.map((item) => {
                        return <h3>Sddsd</h3>;
                      })}
                    </div>
                    <Pagination />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BuyItem;
