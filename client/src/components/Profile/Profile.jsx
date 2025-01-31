import React, { useContext, useEffect, useState } from "react";
import SellerProfile from "./SellerProfile";
import BuyerProfile from "./BuyerProfile";
import { confirmAlert } from "react-confirm-alert";
import { LoginContext } from "./../../context/LoginContext";
import { ThemeContext } from "./../../context/ThemeContext";
import SellerItemTable from "./SellerItemData";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import BuyerOrderData from "./BuyerOrderData";

import "./../../App.css";
import { useAlert } from "react-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";

const Profile = (props) => {
  const [islLoggedIn, setIslLoggedIn] = useContext(LoginContext);
  const [themeData, setThemeData] = useContext(ThemeContext);
  const [sellerProducts, setSellerProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [buyerOrders, setBuyerOrders] = useState([]);
  const [name, setName] = useState("Loading...");
  const [DP, setDP] = useState(
    "https://firebasestorage.googleapis.com/v0/b/fastlk.appspot.com/o/images%2Ffacebook-default-no-profile-pic.jpg?alt=media&token=74e058b8-fd91-4799-b6cd-fdde9619b35d"
  );

  useEffect(() => {
    if (islLoggedIn.login === false) {
      props.history.push("/");
    }
  }, []);

  const alert = useAlert();

  /**
   * get user data by user id
   */
  useEffect(() => {
    const token = localStorage.getItem('token')
    const decoded = jwt_decode(token);
    const id = decoded._id

    var config = {
      method: 'get',
      url: `/api/buyers/getBuyer/${id}`,
      headers: { 
        'token': token
      }
    };

    axios(config).then(res=> {
      setThemeData({...themeData, user: res.data})
      console.log(themeData)
    }).catch(err=> {
      console.log(err)
    })

  },[])

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    axios
      .get(`/api/products/view/${decoded._id}?page=1&limit=100`)
      .then((res) => {
        setSellerProducts(res.data.result.results);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    axios
      .get(`/api/orders/order`)
      .then((res) => {
        const modifiedArray = res.data.filter(
          (data) => data.customer.email === decoded.email
        );
        setBuyerOrders(modifiedArray);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteItem = (e) => {
    const deleteItemId = e.target.id;
    const token = localStorage.getItem("token");
    confirmAlert({
      title: "Confirm to delete",
      message: "Delete this item?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            setIsLoading(true);
            makeDeleteRequest(deleteItemId, token);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);

    if (token === undefined || token === null) {
      props.history.push("/login");
    } else {
      if (islLoggedIn.status === "seller") {
        axios
          .get(`/api/sellers/view/${decoded._id}`, {
            headers: {
              token: token,
            },
          })
          .then((res) => {
            setName(res.data.email);
            setDP(res.data.profilePic);
          })
          .catch((err) => console.log(err));
      }

      if (islLoggedIn.status === "buyer") {
        axios
          .get(`/api/buyers/getBuyer/${decoded._id}`, {
            headers: {
              token: token,
            },
          })
          .then((res) => {
            setName(res.data.currentBuyer.email);
            setDP(res.data.currentBuyer.profilePic);
          })
          .catch((err) => console.log(err));
      }
    }
  });

  const makeDeleteRequest = (deleteItemId, token) => {
    axios
      .delete(`/api/products/delete/${deleteItemId}`, {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        if (res.data.result.n) {
          if (res.data.result.n == 1) {
            alert.success("Succesfully removed!");
            updateUI(deleteItemId);
            setIsLoading(false);
          }
        }
      })
      .catch((err) => {
        alert.error("Something went wrong");
        console.log(err);
        setIsLoading(true);
      });
  };

  const updateUI = (deleteItemId) => {
    setSellerProducts((previousData) => [
      ...previousData.filter((data) => data._id !== deleteItemId),
    ]);
  };

  const {showCart, user} = themeData;

  return (
    <>
      <div
        class="page-header header-filter smooth_load"
        data-parallax="true"
        style={{
          backgroundImage: "url('../assets/img/city-profile.jpg')",
          height: 300,
        }}
      ></div>
      {isLoading ? (
        <Loader
          type="Rings"
          color="red"
          height={100}
          width={100}
          style={{ padding: 200 }}
          //3 secs
        />
      ) : (
        <div class="smooth_load">
          <div class="profile-content">
            <div class="container">
              <div class="row">
                <div class="col-md-6 ml-auto mr-auto">
                  <div class="profile">
                    <div class="avatar ">
                      <img
                        src={DP}
                        alt="Circle Image"
                        style={{ height: 200, width: 200 }}
                        class="img-raised rounded-circle img-fluid main main-raised"
                      />
                    </div>
                    <div class="name">
                      <h5>{name}</h5>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 ml-auto mr-auto">
                  <div class="profile-tabs">
                    <ul
                      class="nav nav-pills nav-pills-icons justify-content-center"
                      role="tablist"
                    >
                      {islLoggedIn.status === "seller" ? (
                        <>
                          <li class="nav-item">
                            <a
                              class="nav-link active bg-success"
                              href="#studio"
                              role="tab"
                              data-toggle="tab"
                            >
                              <i class="material-icons">camera</i> Items
                            </a>
                          </li>
                          <li class="nav-item">
                            <a
                              class="nav-link"
                              href="#works"
                              role="tab"
                              data-toggle="tab"
                            >
                              <i class="material-icons">palette</i> Orders
                            </a>
                          </li>
                        </>
                      ) : null}
                      {islLoggedIn.status === "buyer" ? (
                        <>
                          <li class="nav-item">
                            <a
                              class="nav-link active"
                              href="#studio"
                              role="tab"
                              data-toggle="tab"
                            >
                              <i class="material-icons">camera</i> Orders
                            </a>
                          </li>
                          <li class="nav-item">
                            <a
                              class="nav-link "
                              href="#update-profile"
                              role="tab"
                              data-toggle="tab"
                            >
                              <i class="material-icons">update</i> Update Profile
                            </a>
                          </li>
                        </>
                      ) : null}
                    </ul>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                {islLoggedIn.status === "seller" ? (
                  <Link to="/addproduct">
                    <button class="btn btn-outline-success" style={{ padding: 10 }}>
                      Add New Product
                    </button>
                  </Link>
                ) : null}
              </div>
              <div class="tab-content tab-space">
              <div class="tab-pane text-center" id="update-profile">
                  <div className="row">
                    update data
                  </div>
              </div>
                <div class="tab-pane active text-center gallery" id="studio">
                  <div class="row">
                    {islLoggedIn.status === "seller" ? (
                      <SellerItemTable
                        sellerProducts={sellerProducts}
                        deleteItem={deleteItem}
                        history={props.history}
                      />
                    ) : (
                      <BuyerOrderData buyerOrders={buyerOrders} />
                    )}
                  </div>
                </div>
                <div class="tab-pane text-center gallery" id="works">
                  <div class="row">
                    {islLoggedIn.status === "seller" ? (
                      <SellerItemTable
                        sellerProducts={sellerProducts}
                        deleteItem={deleteItem}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
