import React, { Component } from "react";

const BuyerOrderData = ({ buyerOrders }) => {
  console.log(buyerOrders);
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
            <td >
              {order.items.map((item) => (
                <li>Item : {item.name} - count {item.quantity}</li>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BuyerOrderData;
