import React, { Component } from "react";

const SellerProfile = () => {
  return (
    <>
      <div class="row">
        <div class="col-md-12 ml-12 mr-12">
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
                  <i class="material-icons">camera</i> Orders
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#works" role="tab" data-toggle="tab">
                  <i class="material-icons">palette</i> Items
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
      <div class="tab-content tab-space">
        <div class="tab-pane active text-center gallery" id="studio">
          <div class="row">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                  <th scope="col">Handle</th>
                  <th scope="col">Handle</th>

                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="tab-pane text-center gallery" id="works">
          <div class="row">wewewewewewew</div>
        </div>
        <div class="tab-pane text-center gallery" id="favorite">
          <div class="row">dsdsdsdsd</div>
        </div>
      </div>
    </>
  );
};

export default SellerProfile;
