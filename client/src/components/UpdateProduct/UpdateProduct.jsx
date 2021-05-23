import React, { useEffect, useState } from "react";
import * as EmailValidator from "email-validator";
import { storageRef2 } from "./../../firebase";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAlert } from "react-alert";
import jwt_decode from "jwt-decode";
import "./../../App.css";

const UpdateProduct = (props) => {
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productCount, setProductCount] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [id, setId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const alert = useAlert();

  useEffect(() => {
    window.scroll(0, 0);
    const tempData = JSON.parse(localStorage.getItem("tempUpdateData"));
    setId(tempData._id);
    setProductName(tempData.name);
    setProductDesc(tempData.discription);
    setProductCount(tempData.quantity);
    setProductPrice(tempData.price);
  }, []);

  const HandleProductUpdate = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const validity = validateInputs();

    if (validity) {
      try {
        await updateProductData();
        alert.success("Succesfully Updated!");
        props.history.push("/profile");
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  const validateInputs = () => {
    const isProductNameValid = validateProductName();
    const isProductDescValid = validateProductDesc();
    const isProductCountValid = validatePorductQty();
    const isProductImageValid = validateProductPrice();
    return (
      isProductNameValid &&
      isProductDescValid &&
      isProductCountValid &&
      isProductImageValid
    );
  };

  const validateProductName = () => {
    if (productName.trim() === "" || productName.trim().length <= 4) {
      const productErrorLabel = document.getElementById("producterror");
      productErrorLabel.classList.remove("hide");

      setTimeout(() => {
        productErrorLabel.classList.add("hide");
      }, 2000);
      return false;
    }
    return true;
  };

  const validateProductDesc = () => {
    if (productDesc.trim() === "" || productDesc.trim().length <= 4) {
      const productDescErrorLabel = document.getElementById("productdescerror");
      productDescErrorLabel.classList.remove("hide");

      setTimeout(() => {
        productDescErrorLabel.classList.add("hide");
      }, 2000);
      return false;
    }
    return true;
  };

  const validatePorductQty = () => {
    if (
      productCount.trim() === "" ||
      !/^\+?(0|[1-9]\d*)$/.test(productCount.trim()) ||
      productCount.trim() == 0
    ) {
      const productQtyErrorLabel = document.getElementById("productpricelabel");
      productQtyErrorLabel.innerHTML = "Invalid product count";
      productQtyErrorLabel.classList.remove("hide");

      setTimeout(() => {
        productQtyErrorLabel.classList.add("hide");
      }, 2000);
      return false;
    }
    return true;
  };

  const validateProductPrice = () => {
    if (
      productPrice === "" ||
      !/^\+?(0|[1-9]\d*)$/.test(productPrice) ||
      productPrice == 0
    ) {
      const productPriceErrorLabel =
        document.getElementById("productpricelabel");
      productPriceErrorLabel.innerHTML = "Invalid product price";
      productPriceErrorLabel.classList.remove("hide");

      setTimeout(() => {
        productPriceErrorLabel.classList.add("hide");
      }, 2000);
      return false;
    }
    return true;
  };

  //post data to server
  const updateProductData = () => {
    const token = localStorage.getItem("token");

    return new Promise((resolve, reject) => {
      axios
        .patch(
          `/api/products/update/${id}`,
          {
            name: productName,
            discription: productDesc,
            category: "Fashion",
            quantity: productCount,
            price: productPrice,
            updatedAt: new Date().toString().substring(0, 24),
          },
          {
            headers: {
              token: token,
            },
          }
        )
        .then((res) => {
          resolve("successfully updated data");
        })
        .catch((err) => {
          console.log(err);
          reject("something went wrong");
        });
    });
  };

  return (
    <>
      <div
        class="page-header header-filter smooth_load"
        style={{
          backgroundImage: "url('../assets/img/clark-street-merc.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div class="container" style={{ marginTop: 0 }}>
          <div class="row">
            <div class="col-lg-8 col-md-6 ml-auto mr-auto">
              <div class="card card-login">
                <form class="form" method="" action="">
                  <div class="card-header card-header-danger text-center">
                    <h4 class="card-title">Sell Product</h4>
                  </div>
                  <h6
                    class="description text-center text-grey"
                    style={{ marginBottom: -30 }}
                  >
                    Basic data
                  </h6>
                  <div class="card-body">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="material-icons">swipe</i>
                        </span>
                      </div>
                      <input
                        value={productName}
                        onChange={(e) => {
                          setProductName(e.target.value);
                        }}
                        type="text"
                        class="form-control"
                        placeholder="Product Name"
                      />
                    </div>
                    <h6
                      className="text-danger smooth_load hide text-smallc"
                      id="producterror"
                    >
                      Product name should be more than 4 charactors.
                    </h6>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="material-icons">grading</i>
                        </span>
                      </div>
                      <textarea
                        value={productDesc}
                        onChange={(e) => {
                          setProductDesc(e.target.value);
                        }}
                        type="text"
                        class="form-control"
                        placeholder="Product Description"
                      />
                    </div>
                    <h6
                      className="text-danger smooth_load hide text-smallc"
                      id="productdescerror"
                    >
                      Product description should be more than 4 charactors.
                    </h6>

                    <h6
                      className="text-danger smooth_load password-error hide text-smallc"
                      id="signuppassworderror"
                    ></h6>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="material-icons">settings_input_component</i>
                        </span>
                      </div>
                      <input
                        value={productCount}
                        onChange={(e) => {
                          setProductCount(e.target.value);
                        }}
                        type="text"
                        class="form-control"
                        placeholder="Quantity"
                      />
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="material-icons">request_page </i>
                        </span>
                      </div>
                      <input
                        value={productPrice}
                        onChange={(e) => {
                          setProductPrice(e.target.value);
                        }}
                        type="text"
                        class="form-control"
                        placeholder="Price"
                      />
                    </div>
                    <h6
                      className="text-danger smooth_load password-error hide text-smallc"
                      id="productpricelabel"
                    ></h6>
                    <h6
                      className="text-danger hide smooth_load password-error text-smallc"
                      id="productimageerror"
                    ></h6>
                  </div>
                  <h6
                    className="text-danger smooth_load password-error  text-smallc"
                    id="locationerrorlabel"
                  ></h6>
                  <div class="footer text-center" style={{ marginBottom: 20 }}>
                    {!isLoading ? (
                      <>
                        <button
                          onClick={HandleProductUpdate}
                          class="btn btn-danger btn-round"
                          style={{ marginTop: 30, marginBottom: 0 }}
                        >
                          Update
                        </button>
                      </>
                    ) : (
                      <Loader
                        type="ThreeDots"
                        color="red"
                        height={50}
                        width={50}
                        //3 secs
                      />
                    )}
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

export default UpdateProduct;
