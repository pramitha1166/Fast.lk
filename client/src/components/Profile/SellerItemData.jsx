import React, { Component } from "react";

const SellerItemData = ({sellerProducts, deleteItem}) => {
  return (
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Quantity</th>
          <th scope="col">Price</th>
          <th scope="col">Images</th>
          <th scope="col">Change</th>
        </tr>
      </thead>
      <tbody>
        {sellerProducts.map((product, index) => (
          <tr>
            <th scope="row">{index + 1}</th>
            <td>{product.name}</td>
            <td>{product.discription}</td>
            <td>{product.quantity}</td>
            <td>{product.price}</td>
            <td>
              <button class="btn" style={{ padding: 10 }}>
                Edit Images
              </button>
            </td>
            <td style={{ display: "flex" }}>
              <button class="btn" style={{ padding: 10 }}>
                Update
              </button>
              <button
                class="btn"
                style={{ padding: 10 }}
                onClick={deleteItem}
                id={product._id}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SellerItemData;
