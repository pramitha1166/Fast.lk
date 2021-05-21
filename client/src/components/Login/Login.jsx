import React, { useState, useContext } from "react";

import "./../../App.css";
import { FaRegUserCircle } from "react-icons/fa";
import { LoginContext } from "./../../context/LoginContext";
import Loader from "react-loader-spinner";
import * as EmailValidator from "email-validator";
import {Link} from 'react-router-dom';
import axios from "axios";
import { isAuthenticated } from "../auth";
//import {checkTokan} from '../auth/index'

const Login = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [islLoggedIn, setIslLoggedIn] = useContext(LoginContext);
  const [password, setPassword] = useState("");

  const HandleLogin = (event) => {
    event.preventDefault();

    const validity = validateInput();
    if (validity) {
      setIsLoading(false);
      axios
        .post("/api/buyerauth/login", {
          email: email,
          password: password,
        })
        .then((res) => {
          setIsLoading(true);

          if (res.data == "Invalid password" || res.data == "Invalid email") {
            const credentialErrorLabel =
              document.querySelector(".credentials-error");
            credentialErrorLabel.classList.remove("hide");

            setTimeout(() => {
              credentialErrorLabel.classList.add("hide");
            }, 2000);
          } else {
            localStorage.setItem('token', res.data)
            console.log(res.data)
            setEmail("");
            setPassword("");
            localStorage.setItem("loginData", "buyer");
            localStorage.setItem("token", res.data);
            setIslLoggedIn({
              login: true,
              status: "buyer",
            });
            props.history.push("/");
          }
        })
        .catch((err) => setIsLoading(true));
    }
  };

  const validateInput = () => {
    const isEmailValid = emailChecker();
    const isPassword = passwordChecker();

    return isEmailValid && isPassword;
  };

  const emailChecker = () => {
    const isEmailValid = EmailValidator.validate(email.trim());
    if (!isEmailValid) {
      const emailErrorLabel = document.querySelector(".email-error");
      emailErrorLabel.classList.remove("hide");

      setTimeout(() => {
        emailErrorLabel.classList.add("hide");
      }, 2000);
      return false;
    }
    return true;
  };

  const passwordChecker = () => {
    if (password.trim().length < 8) {
      const passwordErrorLabel = document.querySelector(".password-error");
      passwordErrorLabel.classList.remove("hide");

      setTimeout(() => {
        passwordErrorLabel.classList.add("hide");
      }, 2000);
      return false;
    }
    return true;
  };

  return (
    <>
      <div
        class="page-header header-filter smooth_load"
        style={{
          backgroundImage:
            "url('../assets/img/pexels-vlada-karpovich-4050388.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div class="container">
          <div class="row">
            <div class="col-lg-4 col-md-6 ml-auto mr-auto">
              <div class="card card-login">
                <form class="form" method="" action="">
                  <div class="card-header card-header-danger text-center">
                    <h4 class="card-title">Login</h4>
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
                  <p class="description text-center">Or Be Classical</p>
                  <div class="card-body">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="material-icons">mail</i>
                        </span>
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        class="form-control"
                        placeholder="Email..."
                      />
                    </div>
                    <h6 className="text-danger smooth_load email-error hide text-smallc">
                      Invalid email
                    </h6>

                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="material-icons">lock_outline</i>
                        </span>
                      </div>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        class="form-control"
                        placeholder="Password..."
                      />
                    </div>
                    <h6 className="text-danger smooth_load password-error hide text-smallc">
                      Password must be 8 characters
                    </h6>
                  </div>
                  <h6 className="text-danger smooth_load credentials-error hide text-smallc">
                    Invalid credentials
                  </h6>
                  <div class="footer text-center" style={{ marginTop: 30 }}>
                    {!isLoading ? (
                      <Loader
                        type="Rings"
                        color="red"
                        height={50}
                        width={50}
                        //3 secs
                      />
                    ) : (
                      <>
                        <button
                          class="btn btn-danger btn-round"
                          onClick={HandleLogin}
                        >
                          Login
                        </button>
                        <Link to="/slogin">
                        <div class="footer text-center">
                          <a
                            href="#pablo"
                            class="btn btn-danger btn-link btn-wd btn-lg"
                          >
                            Seller Login
                          </a>
                        </div> 
                        </Link>
                      </>
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

export default Login;
