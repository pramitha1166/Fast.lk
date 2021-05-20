import React, { useEffect, useState } from "react";
import * as EmailValidator from "email-validator";
import { storageRef2 } from "./../../firebase";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAlert } from "react-alert";
import jwt_decode from "jwt-decode";
import "./../../App.css";

const AddProduct = (props) => {
  const [images, setImages] = useState([]);
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productCount, setProductCount] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const alert = useAlert();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const HandleProductUpload = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const validity = validateInputs();

    if (validity) {
      try {
        const urlArray = await uploadImages();
        await postProductData(urlArray);
        alert.success("Succesfully added!");
        props.history.push("/profile");
      } catch (err) {
          console.log(err)
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  const validateInputs = () => {
    const isImagesValid = validateImage();
    const isProductNameValid = validateProductName();
    const isProductDescValid = validateProductDesc();
    const isProductCountValid = validatePorductQty();
    const isProductImageValid = validateProductPrice();
    return (
      isImagesValid &&
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
      productPrice.trim() === "" ||
      !/^\+?(0|[1-9]\d*)$/.test(productPrice.trim()) ||
      productPrice.trim() == 0
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

  const validateImage = () => {
    if (images.length === 0) {
      const imageErrorLabel = document.getElementById("productimageerror");
      imageErrorLabel.innerHTML = "Please choose some images";
      imageErrorLabel.classList.remove("hide");

      setTimeout(() => {
        imageErrorLabel.classList.add("hide");
      }, 2000);
      return false;
    }
    return true;
  };

  //update image state when choosing an image
  const setImageQuestion = (e) => {
    const fileLength = e.target.files.length;
    const images = [];

    for (let i = 0; i <= fileLength - 1; i++) {
      if (
        e.target.files[i].type === "image/png" ||
        e.target.files[i].type === "image/jpeg" ||
        e.target.files[i].type === "image/jpg"
      ) {
        images.push(e.target.files[i]);
      } else {
        const imageErrorLabel = document.getElementById("productimageerror");
        imageErrorLabel.innerHTML =
          "Please choose a valid image type[JPEG/PNG]";
        imageErrorLabel.classList.remove("hide");
      }
    }

    if (images.length > 0) {
      setImages(images);
    }
  };

  //upload image to firebase
  const uploadImages = async () => {
    const finalImages = [];
    return new Promise((resolve, reject) => {
      try {
        for (let i = 0; i <= images.length - 1; i++) {
          const upload = storageRef2
            .ref(`imagestemp/${images[i].name}`)
            .put(images[i]);
          upload.on(
            "state_changed",
            (snapshot) => {},
            (error) => {
              console.log(error);
            },
            () => {
              storageRef2
                .ref("imagestemp")
                .child(images[i].name)
                .getDownloadURL()
                .then((url) => {
                  finalImages.push(url);
                  if (finalImages.length === images.length) {
                    resolve(finalImages);
                  }
                });
            }
          );
        }
      } catch (err) {
        console.log(err);
        reject("something went wrong");
      }
    });
  };

  //post data to server
  const postProductData = (images) => {
    const token = localStorage.getItem("token");
    const decodeData = jwt_decode(token);

    return new Promise((resolve, reject) => {
      axios
        .post(
          `/api/products/add`,
          {
            images: images,
            name: productName,
            discription: productDesc,
            category: "Fashion",
            quantity: productCount,
            price: productPrice,
            addedAt: (new Date()).toString().substring(0,24),
            ownerRef: decodeData._id,
          },
          {
            headers: {
              token: token,
            },
          }
        )
        .then((res) => {
          resolve("successfully posted data");
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
                    <div
                      style={{
                        marginLeft: 15,
                        marginTop: 20,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="material-icons">view_sidebar</i>
                        </span>
                      </div>
                      <input
                        style={{ marginLeft: 15 }}
                        name="filefield"
                        multiple="multiple"
                        onChange={setImageQuestion}
                        type="file"
                        class="form-control-file"
                        id="exampleFormControlFile1"
                      />
                    </div>
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
                          onClick={HandleProductUpload}
                          class="btn btn-danger btn-round"
                          style={{ marginTop: 30, marginBottom: 0 }}
                        >
                          Add
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

export default AddProduct;
