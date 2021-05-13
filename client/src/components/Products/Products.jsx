import React, { useEffect, useState } from "react";
import LoaderSpinner from "./../Comman/LoaderSpinner";
import ProductCard from "./ProdcutCard";
import Pagination from "./../Comman/Pagination";
import { FaUndo } from "react-icons/fa";
import Slider, { Range } from "rc-slider";
import axios from "axios";
import "rc-slider/assets/index.css";

import "./../../App.css";
import "./../../styles/Product.css";

const Products = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
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
        class="page-header header-filter"
        data-parallax="true"
        style={{
          backgroundImage: "url('../assets/img/clark-street-merc.jpg')",
          height: 400,
        }}
      ></div>
      <div class="main main-raised">
        <div>
          {isLoading ? (
            <LoaderSpinner />
          ) : (
            <>
              {/* <div class="container">
                <div class="row">
                  <div class="col-2">
                    
                  </div>
                  <div class="col-10">
                    
                  </div>
                </div>
              </div> */}
              <div className="container">
                <div class="row">
                  <div class="col-lg-2 col-sm-12 col-md-12">
                    <div style={{ marginTop: 23 }}>
                      <h4 style={{ textAlign: "left" }}>Find what you need.</h4>
                      <div className="reset">
                        <h5>Refine</h5>
                        <FaUndo />
                      </div>
                    </div>
                    <Slider />
                    <Range />
                  </div>
                  <div class="col-lg-10 col-sm-12 col-md-10 ">
                    <div class="card-deck">
                      {items.map((item) => {
                        return <ProductCard image={item.images[0]} />;
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

export default Products;
