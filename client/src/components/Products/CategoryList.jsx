import React, { Component } from "react";

import "./../../styles/Product.css";

const CategoryList = () => {
  return (
    <>
      <ul class="list-group">
        <li class="list_item">
          Electrics
          <span class="badge badge-primary badge-pill bg-danger">14</span>
        </li>
        <li class="list_item">
          Vehicles
          <span class="badge badge-primary badge-pill bg-danger">2</span>
        </li>
        <li class="list_item">
          Lands
          <span class="badge badge-primary badge-pill bg-danger">1</span>
        </li>
      </ul>
    </>
  );
};

export default CategoryList;
