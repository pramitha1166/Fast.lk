import React, { useContext, useEffect, useState } from "react";
import SellerProfile from "./SellerProfile";
import BuyerProfile from "./BuyerProfile";
import { confirmAlert } from "react-confirm-alert";
import { LoginContext } from "./../../context/LoginContext";
import SellerItemTable from "./SellerItemData";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";

import "./../../App.css";
import { useAlert } from "react-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";

const Profile = (props) => {
  const [islLoggedIn, setIslLoggedIn] = useContext(LoginContext);
  const [sellerProducts, setSellerProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (islLoggedIn.login === false) {
      props.history.push("/");
    }
  });

  const alert = useAlert();

  useEffect(() => {
    axios
      .get(`/api/products/view/60a1d0913876443954025c33?page=1&limit=10`)
      .then((res) => {
        setSellerProducts(res.data.result.results);
        setIsLoading(false);
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
        console.log(err)
        setIsLoading(true);
      });
  };

  const updateUI = (deleteItemId) => {
    setSellerProducts((previousData) => [
      ...previousData.filter((data) => data._id !== deleteItemId),
    ]);
  };

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
                        src="../assets/img/faces/christian.jpg"
                        alt="Circle Image"
                        style={{ height: 200, width: 200 }}
                        class="img-raised rounded-circle img-fluid main main-raised"
                      />
                    </div>
                    <div class="name">
                      <h3 class="title">Christian Louboutin</h3>
                      <h6>Designer</h6>
                      {islLoggedIn.status === "buyer" ? <BuyerProfile /> : null}

                      <a
                        href="#pablo"
                        class="btn btn-just-icon btn-link btn-dribbble"
                      >
                        <i class="fa fa-dribbble"></i>
                      </a>
                      <a
                        href="#pablo"
                        class="btn btn-just-icon btn-link btn-twitter"
                      >
                        <i class="fa fa-twitter"></i>
                      </a>
                      <a
                        href="#pablo"
                        class="btn btn-just-icon btn-link btn-pinterest"
                      >
                        <i class="fa fa-pinterest"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="description text-center">
                <p>
                  An artist of considerable range, Chet Faker &#x2014; the name
                  taken by Melbourne-raised, Brooklyn-based Nick Murphy &#x2014;
                  writes, performs and records all of his own music, giving it a
                  warm, intimate feel with a solid groove structure.{" "}
                </p>
              </div>
              <div class="row">
                <div class="col-md-6 ml-auto mr-auto">
                  <div class="profile-tabs">
                    <ul
                      class="nav nav-pills nav-pills-icons justify-content-center"
                      role="tablist"
                    >
                      <li class="nav-item">
                        <a
                          class="nav-link active"
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
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          href="#favorite"
                          role="tab"
                          data-toggle="tab"
                        >
                          <i class="material-icons">favorite</i> Favorite
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Link to="/addproduct">
                <button class="btn" style={{ padding: 10 }}>
                  Add New Product
                </button>
                </Link>
              </div>
              <div class="tab-content tab-space">
                <div class="tab-pane active text-center gallery" id="studio">
                  <div class="row">
                    {islLoggedIn.status === "seller" ? (
                      <SellerItemTable
                        sellerProducts={sellerProducts}
                        deleteItem={deleteItem}
                      />
                    ) : null}
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
                <div class="tab-pane text-center gallery" id="favorite">
                  <div class="row">dsdsdsdsd</div>
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
