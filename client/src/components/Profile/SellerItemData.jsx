import React, { Component } from "react";

const SellerItemData = ({ sellerProducts, deleteItem, history }) => {
  const saveDataTemp = (product) => {
    localStorage.setItem("tempUpdateData", JSON.stringify(product));
    history.push("/updateproduct");
  };

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
              <button class="btn btn-outline-success" style={{ padding: 10 }}>
                Edit Images
              </button>
            </td>
            <td style={{ display: "flex" }}>
              <button
                class="btn btn-outline-success"
                style={{ padding: 10 }}
                onClick={() => saveDataTemp(product)}
              >
                Update
              </button>
              <button
                class="btn btn-outline-danger"
                style={{ padding: 10, marginLeft: 10 }}
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
