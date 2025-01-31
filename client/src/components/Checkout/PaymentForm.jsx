import React, { useState, useEffect, useContext } from "react";
import "braintree-web";
import DropIn from "braintree-web-drop-in-react";
import { useAlert } from "react-alert";
import { CartContext } from "./../../context/CartContext";
import { processPayment, processOrder, sendEmail } from "./coreAPI";
import LoaderSpinner from "../Comman/LoaderSpinner";
import jwt_decode from 'jwt-decode'

const PaymentForm = ({ shippingData, clientToken, cart_data, nextStep, history }) => {
  const alert = useAlert();
  const [cartData, setCartData] = useContext(CartContext);
  let total = 0;
  let newData = [];
  cartData.forEach((cartData) => {
    total = total + (cartData.price + cartData.quantity);
    let temp = {
      name: cartData.name,
      quantity: cartData.quantity,
      price: cartData.price,
      img: cartData.img
    };

    newData.push(temp);
  });

  const [data, setData] = useState({
    instance: {},
  });

  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  let tot = 0;

  let cart_array = [];

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  });

  const getCartTotal = () => {
    cart_data.map((data) => {
      tot = tot + data.quantity * data.price;
    });
    //setOrder({...order, amount: tot})
    return tot;
  };

  const getCartItemArray = () => {
    cart_data.map((data) => {
      cart_array.push(data);
    });
    return cart_array;
    //setOrder({...order, items: cart_array})
  };

  const [order, setOrder] = useState({
    customer: {
      _id: jwt_decode(localStorage.getItem('token'))._id,
      firstname: shippingData.firstname,
      lastname: shippingData.lastname,
      email: shippingData.email,
    },
    billing: {
      name: shippingData.firstname,
      street: shippingData.firstname,
      town_city: shippingData.firstname,
      postal_zip_code: shippingData.zip,
      country: "SriLanka",
    },
    amount: total,
    items: newData,
    createdAt: "2021-05-16T09:56:06.755Z",
    updatedAt: "2021-05-16T09:56:06.755Z",
  });

  const test = () => {
    getCartItemArray();
  };

  const buy = () => {
    //return;
    let nonce;
    let getNonse = data.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        console.log(nonce)
        const paymentData = {
          paymentMethodNonse: nonce,
          amount: order.amount,
        };

        setLoading(true);
        processOrder(order)
          .then((res) => {
            alert.success("Order Place Successfully");
            processPayment(paymentData)
              .then((res) => {
                setLoading(false);
                alert.success("Payment Success");
                history.push("/");
                setCartData([]);
                //nextStep()

                let emailData = {
                  receiver: order.customer.email,
                  title: "Order Confirmation",
                  subject: "Your Order Confirmation Details",
                  details: `Your order has been reveived successfully, Amount: ${order.amount}`,
                };

                sendEmail(emailData)
                  .then((res) => console.log(res))
                  .catch((err) => console.log(err));
              })
              .catch((err) => {
                setLoading(false);
                console.log(err);
                alert.error("Error with making payment");
              });
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
            alert.error("Error With Placing Order");
          });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const showDropIn = () => (
    <div>
      {/* {JSON.stringify(order)} */}
      <DropIn
        options={{
          authorization: clientToken,
        }}
        onInstance={(instance) => (data.instance = instance)}
      />
      {isLoading ? (
        "Please Wait"
      ) : (
        <button className="btn btn-danger" onClick={buy}>
          Checkout
        </button>
      )}
    </div>
  );

  useEffect(() => {
    // setCartTotal()
    // setCartItemArray()
  });

  return (
    <div className="container">
      {loading ? <LoaderSpinner /> : showDropIn()}
      <br />
      {/* {JSON.stringify(shippingData)} */}
    </div>
  );
};

export default PaymentForm;
