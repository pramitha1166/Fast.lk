import React, { useState } from "react";
import * as EmailValidator from "email-validator";
import { storageRef2 } from "./../../firebase";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import axios from "axios";
import "./../../App.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [username, setUsername] = useState("");
  const [mobilenumber, setMobilenumber] = useState("");
  const [image, setImage] = useState(undefined);
  const [houseno, setHouseno] = useState("");
  const [streetno, setStreetno] = useState("");
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const validity = validateInputs();

    if (validity) {
      try {
        const url = await uploadImage();
        const posted = await postBuyerData(url);

        alert("succesfully added the user");
        setIsLoading(false);
      } catch (err) {
        alert("soemthing went wrong");
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  const validateInputs = () => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isUsernameAndMobilevalid = validateUserName();
    const isHouseNoValid = validateHouseNo();
    const isStreetNoValid = validateStreetno();
    const isCityValid = validateCity();
    const isImageValid = validateImage();

    return (
      isEmailValid &&
      isPasswordValid &&
      isUsernameAndMobilevalid &&
      isHouseNoValid &&
      isStreetNoValid &&
      isCityValid &&
      isImageValid
    );
  };

  const validateEmail = () => {
    const isEmailValid = EmailValidator.validate(email.trim());
    if (!isEmailValid) {
      const emailErrorLabel = document.getElementById("signupemailerror");
      emailErrorLabel.classList.remove("hide");

      setTimeout(() => {
        emailErrorLabel.classList.add("hide");
      }, 2000);
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    const passwordErrorLabel = document.getElementById("signuppassworderror");
    if (password.trim().length < 8) {
      passwordErrorLabel.innerHTML =
        "Password must be at least 8 charactors long";
      passwordErrorLabel.classList.remove("hide");

      setTimeout(() => {
        passwordErrorLabel.classList.add("hide");
      }, 2000);
      return false;
    }

    if (password.trim() !== cpassword.trim()) {
      passwordErrorLabel.innerHTML = "Passwords mismatched";
      passwordErrorLabel.classList.remove("hide");

      setTimeout(() => {
        passwordErrorLabel.classList.add("hide");
      }, 2000);
      return false;
    }
    return true;
  };

  const validateUserName = () => {
    const usermobileerrorlabel = document.getElementById(
      "usernamemobileerrorlabel"
    );
    const mobileRegex = /^\d+$/;

    if (username.trim().length === 0) {
      usermobileerrorlabel.innerHTML = "Enter a username";
      usermobileerrorlabel.classList.remove("hide");

      setTimeout(() => {
        usermobileerrorlabel.classList.add("hide");
      }, 2000);
      return false;
    }

    if (
      mobilenumber.trim().length !== 10 ||
      !mobileRegex.test(mobilenumber.trim())
    ) {
      usermobileerrorlabel.innerHTML = "Invalid mobile number";
      usermobileerrorlabel.classList.remove("hide");

      setTimeout(() => {
        usermobileerrorlabel.classList.add("hide");
      }, 2000);
      return false;
    }

    return true;
  };

  const validateHouseNo = () => {
    const usermobileerrorlabel = document.getElementById("locationerrorlabel");
    if (houseno.trim().length <= 0) {
      usermobileerrorlabel.innerHTML = "Enter your house number";
      usermobileerrorlabel.classList.remove("hide");

      setTimeout(() => {
        usermobileerrorlabel.classList.add("hide");
      }, 2000);
      return;
    }
    return true;
  };

  const validateStreetno = () => {
    const usermobileerrorlabel = document.getElementById("locationerrorlabel");
    if (streetno.trim().length <= 0) {
      usermobileerrorlabel.innerHTML = "Enter your street number";
      usermobileerrorlabel.classList.remove("hide");

      setTimeout(() => {
        usermobileerrorlabel.classList.add("hide");
      }, 2000);
      return;
    }
    return true;
  };

  const validateCity = () => {
    const usermobileerrorlabel = document.getElementById("locationerrorlabel");
    if (city.trim().length <= 0) {
      usermobileerrorlabel.innerHTML = "Enter your city name";
      usermobileerrorlabel.classList.remove("hide");

      setTimeout(() => {
        usermobileerrorlabel.classList.add("hide");
      }, 2000);
      return;
    }
    return true;
  };

  const validateImage = () => {
    if (image === undefined) {
      const imageErrorLabel = document.getElementById("signupimageerror");
      imageErrorLabel.innerHTML = "Invalid image.";
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
    if (
      e.target.files[0].type === "image/png" ||
      e.target.files[0].type === "image/jpeg" ||
      e.target.files[0].type === "image/jpg"
    ) {
      if (e.target.files[0]) {
        setImage(e.target.files[0]);
      }
    } else {
      const imageErrorLabel = document.getElementById("signupimageerror");
      imageErrorLabel.innerHTML = "Please choose a valid image type[JPEG/PNG]";
      imageErrorLabel.classList.remove("hide");
    }
  };

  //upload image to firebase
  const uploadImage = () => {
    return new Promise((resolve, reject) => {
      try {
        const upload = storageRef2.ref(`images/${image.name}`).put(image);
        upload.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log(error);
          },
          () => {
            storageRef2
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then((url) => {
                resolve(url);
              });
          }
        );
      } catch (err) {
        reject("something went wrong");
      }
    });
  };

  //post data to server
  const postBuyerData = (url) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`/api/buyers/addBuyer`, {
          userName: username,
          email: email,
          password: password,
          address: {
            houseNo: houseno,
            streetName: streetno,
            city: city,
          },
          phoneNumber: mobilenumber,
          profilePic: url,
        })
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
          backgroundImage:
            "url('../assets/img/pexels-andrea-piacquadio-935756.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div class="container" style={{ marginTop: 100 }}>
          <div class="row">
            <div class="col-lg-8 col-md-6 ml-auto mr-auto">
              <div class="card card-login">
                <form class="form" method="" action="">
                  <div class="card-header card-header-danger text-center">
                    <h4 class="card-title">Sign Up</h4>
                    <div class="social-line">
                      <a href="#pablo" class="btn btn-just-icon btn-link">
                        <i class="fa fa-facebook-square"></i>
                      </a>
                      <a href="#pablo" class="btn btn-just-icon btn-link">
                        <i class="fa fa-twitter"></i>
                      </a>
                      <a href="#pablo" class="btn btn-just-icon btn-link">
                        <i class="fa fa-google-plus"></i>
                      </a>
                    </div>
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
                          <i class="material-icons">mail</i>
                        </span>
                      </div>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        class="form-control"
                        placeholder="Email..."
                      />
                    </div>
                    <h6
                      className="text-danger smooth_load hide text-smallc"
                      id="signupemailerror"
                    >
                      Invalid email.
                    </h6>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="material-icons">lock_outline</i>
                        </span>
                      </div>
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        class="form-control"
                        placeholder="Password"
                      />
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="material-icons">lock_outline</i>
                        </span>
                      </div>
                      <input
                        value={cpassword}
                        onChange={(e) => setCpassword(e.target.value)}
                        type="password"
                        class="form-control"
                        placeholder="Confirm Password"
                      />
                    </div>
                    <h6
                      className="text-danger smooth_load password-error hide text-smallc"
                      id="signuppassworderror"
                    ></h6>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="material-icons">face</i>
                        </span>
                      </div>
                      <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        class="form-control"
                        placeholder="Username"
                      />
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="material-icons">app_settings_alt </i>
                        </span>
                      </div>
                      <input
                        value={mobilenumber}
                        onChange={(e) => setMobilenumber(e.target.value)}
                        type="text"
                        class="form-control"
                        placeholder="Mobile Number"
                      />
                    </div>
                    <h6
                      className="text-danger smooth_load password-error hide text-smallc"
                      id="usernamemobileerrorlabel"
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
                          <i class="material-icons">attribution</i>
                        </span>
                      </div>
                      <input
                        style={{ marginLeft: 15 }}
                        onChange={setImageQuestion}
                        type="file"
                        class="form-control-file"
                        id="exampleFormControlFile1"
                      />
                    </div>
                    <h6
                      className="text-danger hide smooth_load password-error text-smallc"
                      id="signupimageerror"
                    ></h6>
                    <h6
                      class="description text-center text-grey"
                      style={{ marginBottom: -20, marginTop: 20 }}
                    >
                      Location data
                    </h6>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="material-icons">home</i>
                        </span>
                      </div>
                      <input
                        value={houseno}
                        onChange={(e) => setHouseno(e.target.value)}
                        type="text"
                        class="form-control"
                        placeholder="HouseNo"
                      />
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="material-icons">place</i>
                        </span>
                      </div>
                      <input
                        value={streetno}
                        onChange={(e) => setStreetno(e.target.value)}
                        type="text"
                        class="form-control"
                        placeholder="Street"
                      />
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="material-icons">add_location_alt</i>
                        </span>
                      </div>
                      <input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        type="text"
                        class="form-control"
                        placeholder="City"
                      />
                    </div>
                  </div>
                  <h6
                    className="text-danger smooth_load password-error hide text-smallc"
                    id="locationerrorlabel"
                  ></h6>
                  <div class="footer text-center">
                    {!isLoading ? (
                      <>
                        <button
                          onClick={handleSignUp}
                          class="btn btn-danger btn-round"
                          style={{ marginTop: 30, marginBottom: 0 }}
                        >
                          Signup
                        </button>
                        <Link to="/ssignup">
                          <div class="footer text-center">
                            <a
                              href="#pablo"
                              class="btn btn-danger btn-link btn-wd btn-lg"
                            ><h6>
                             Join with us as a seller?.
                            </h6>
                            </a>
                          </div>
                        </Link>
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

export default Signup;
