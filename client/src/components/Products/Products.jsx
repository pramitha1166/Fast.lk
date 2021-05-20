import React, { useEffect, useState } from "react";
import LoaderSpinner from "./../Comman/LoaderSpinner";
import ProductCard from "./ProdcutCard";
import { FaUndo } from "react-icons/fa";
import axios from "axios";
import "rc-slider/assets/index.css";

import Pagination from "./../Comman/Pagination";
import PriceSelect from "./PriceSelect";
import CategoryList from "./CategoryList";

import "./../../App.css";
import "./../../styles/Product.css";

const Products = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [startIndex, setStartIndex] = useState(1);
  const [startLimit, setStartLimit] = useState(6);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [isMoreDataLoading, setIsMoreDataLoading] = useState(false);


  useEffect(() => {
    window.scroll(0, 0);
    loadInitialData();
  }, []);

  const loadMore = () => {
    setStartLimit((previous) => previous + 3);
    loadInitialData();
  };

  const loadInitialData = () => {
    setIsMoreDataLoading(true);
    axios
      .get(`/api/products/view?page=${startIndex}&limit=${startLimit}`)
      .then((res) => {
        res.data.result.previous ? setHasPrevious(true) : setHasPrevious(false);
        res.data.result.next ? setHasNext(true) : setHasNext(false);

        setItems(res.data.result.results);
        setIsLoading(false);
        setIsMoreDataLoading(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div
        class="page-header header-filter smooth_load"
        data-parallax="true"
        style={{
          backgroundImage: "url('../assets/img/clark-street-merc.jpg')",
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
                  <div class="col-lg-2 col-sm-12 col-md-12">
                    <div style={{ marginTop: 23 }}>
                      <h4 style={{ textAlign: "left" }}>Find what you need.</h4>
                      <div className="reset">
                        <h5>Refine</h5>
                        <FaUndo />
                      </div>
                    </div>
                    <div>
                      <form>
                        <div class="form-row">
                          <div class="col">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Search Here..."
                            />
                          </div>
                        </div>
                      </form>
                    </div>

                    <div className="gap">
                      <h6>Price Range</h6>
                      <PriceSelect />
                    </div>
                    <div className="gap">
                      <h6>Categories</h6>
                      <CategoryList />
                    </div>
                  </div>
                  <div class="col-lg-10 col-sm-12 col-md-12">
                    <div class="card-deck">
                      {items.map((item) => {
                        return <ProductCard props={props} image={item.images[0]} itemData={item}/>;
                      })}
                    </div>
                    <Pagination
                      hasNext={hasNext}
                      hasPrevious={hasPrevious}
                      loadMore={loadMore}
                      isMoreDataLoading={isMoreDataLoading}
                    />
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
