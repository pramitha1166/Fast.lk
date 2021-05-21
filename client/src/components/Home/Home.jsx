import ProductCard from "../Products/ProdcutCard";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "./../../context/LoginContext";
import "./../../App.css";
import "./Home.css";

const Home = () => {
  const [islLoggedIn, setIslLoggedIn] = useContext(LoginContext);

  useEffect(() => {
    window.scroll(0, 0);
  });
  return (
    <>
      <div
        className="page-header header-filter smooth_load"
        data-parallax="true"
        style={{
          backgroundImage:
            "url('https://cdn.shopify.com/s/files/1/0437/0454/9536/files/slider_2000x.png?v=1595597573",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1 className="title">Leading Shopping Plaform.</h1>
              <h4>
                Every landing page needs a small description after the big bold
                title, that&apos;s why we added this text here. Add here all the
                information that can make you or your product create the first
                impression.
              </h4>
              <br />
              {islLoggedIn.status !== "seller" ? (
                <Link to="/products">
                  <a
                    href="!#"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-danger btn-raised btn-lg"
                  >
                    <i
                      style={{ marginRight: "5px" }}
                      class="fa fa-shopping-bag"
                      aria-hidden="true"
                    ></i>{" "}
                    Shop Now
                  </a>
                </Link>
              ) : null}

              {islLoggedIn.status === "seller" ? (
                <Link to="/addproduct">
                  <a
                    href="!#"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-danger btn-raised btn-lg"
                  >
                    <i
                      style={{ marginRight: "5px" }}
                      class="fa fa-shopping-bag"
                      aria-hidden="true"
                    ></i>{" "}
                    Sell Now
                  </a>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="main main-raised">
        <div className="container">
          <div className="section text-center">
            <div className="best-selling">
              <div className="row">
                <div className="col-md-6 img-section">
                  <img src="https://n4.sdlcdn.com/imgs/a/m/h/Reebok-Brown-Sport-Shoes-SDL436874765-5-be26c.JPG" />
                </div>
                <div className="col-md-6 content">
                  <h4>Best Selling Product</h4>
                  <h2>
                    Nike Hyperdunk 2017 Men Basketball Shoes Royal Blue Gold
                  </h2>
                  <p>
                    Sed viverra ipsum nunc aliquet bibendum. Viverra ipsum nunc
                    aliquet bibendum enim facilisis gravida neque. Imperdiet
                    massa tincidunt nunc pulvinar sapien et ligula ullamcorper.
                  </p>
                  <h3>
                    100$<span class="badge badge-danger">10% off</span>
                  </h3>
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "150px" }} className="best-selling">
              <div className="row">
                <div className="col-md-6 content">
                  <h4>Featuring Product</h4>
                  <h2>
                    Nike Hyperdunk 2017 Men Basketball Shoes Royal Blue Gold
                  </h2>
                  <p>
                    Sed viverra ipsum nunc aliquet bibendum. Viverra ipsum nunc
                    aliquet bibendum enim facilisis gravida neque. Imperdiet
                    massa tincidunt nunc pulvinar sapien et ligula ullamcorper.
                  </p>
                  <h3>
                    100$<span class="badge badge-danger">10% off</span>
                  </h3>
                  <button className="btn btn-primary">Buy Now</button>
                </div>
                <div className="col-md-6 img-section">
                  <img src="https://n4.sdlcdn.com/imgs/a/m/h/Reebok-Brown-Sport-Shoes-SDL436874765-5-be26c.JPG" />
                </div>
              </div>
            </div>

            <div className="list-product-by">
              <div>
                <h2 className="title">Newst Arrival Products</h2>
                <div className="row">
                  <div className="card-deck">
                    {/* <ProductCard image="https://th.bing.com/th/id/OIP.1aX6C11_GuvcmJImgq5yIgHaHa?pid=ImgDet&w=1200&h=1200&rs=1" />
                    <ProductCard image="https://th.bing.com/th/id/OIP.1aX6C11_GuvcmJImgq5yIgHaHa?pid=ImgDet&w=1200&h=1200&rs=1" />
                    <ProductCard image="https://th.bing.com/th/id/OIP.1aX6C11_GuvcmJImgq5yIgHaHa?pid=ImgDet&w=1200&h=1200&rs=1" /> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="list-product-by" style={{ marginTop: "300px" }}>
              <div>
                <h2 className="title">Best Selling Products</h2>
                <div className="row">
                  <div className="card-deck">
                    {/* <ProductCard image="https://th.bing.com/th/id/OIP.1aX6C11_GuvcmJImgq5yIgHaHa?pid=ImgDet&w=1200&h=1200&rs=1" />
                    <ProductCard image="https://th.bing.com/th/id/OIP.1aX6C11_GuvcmJImgq5yIgHaHa?pid=ImgDet&w=1200&h=1200&rs=1" />
                    <ProductCard image="https://th.bing.com/th/id/OIP.1aX6C11_GuvcmJImgq5yIgHaHa?pid=ImgDet&w=1200&h=1200&rs=1" /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="section section-contacts"
            style={{ marginTop: "150px" }}
          >
            <div className="row">
              <div className="col-md-8 ml-auto mr-auto">
                <h2 className="text-center title">Contact us</h2>
                <h4 className="text-center description">
                  Divide details about your product or agency work into parts.
                  Write a few lines about each one and contact us about any
                  further collaboration. We will responde get back to you in a
                  couple of hours.
                </h4>
                <form className="contact-form">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="bmd-label-floating">Your Name</label>
                        <input type="email" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="bmd-label-floating">Your Email</label>
                        <input type="email" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="exampleMessage"
                      className="bmd-label-floating"
                    >
                      Your Message
                    </label>
                    <textarea
                      type="email"
                      className="form-control"
                      rows="4"
                      id="exampleMessage"
                    ></textarea>
                  </div>
                  <div className="row">
                    <div className="col-md-4 ml-auto mr-auto text-center">
                      <button className="btn btn-primary btn-raised">
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
