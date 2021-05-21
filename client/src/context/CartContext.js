import React, { useState, createContext, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = (props) => {
  const [cartData, setCartData] = useState([
    {
      _id: 1,
      img: "https://th.bing.com/th/id/OIP.wycFRpdMjTifD1dm4v2S9wHaE8?w=277&h=185&c=7&o=5&pid=1.7",
      price: 50,
      name: "ssdsdsdsds",
      quantity: 2,
    },
    {
      _id: 2,
      img: "https://th.bing.com/th/id/OIP.uPZMFcCEz61U_eD1eZcQoAAAAA?w=249&h=191&c=7&o=5&pid=1.7",
      price: 20,
      name: "ssdsdsdsds",
      quantity: 3,
    }
  ]);

  return (
    <CartContext.Provider value={[cartData, setCartData]}>
      {props.children}
    </CartContext.Provider>
  );
};
