import React, { Component } from "react";

const BuyerOrderData = ({ buyerOrders }) => {
  return (
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Date</th>
          <th scope="col">Total</th>
          <th scope="col">Items</th>
        </tr>
      </thead>
      <tbody>
        {buyerOrders.map((order, index) => (
          <tr>
            <th scope="row">{index + 1}</th>
            <td>{order.createdAt.substring(0, 19)}</td>
            <td>Rs {order.amount}</td>
            <td>
              <button class="btn" onClick={() => {}}>
                View Details
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BuyerOrderData;
