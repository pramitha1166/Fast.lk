import axios from "axios";

export const processPayment = (paymentData) => {
  return fetch("http://localhost:5007/api/payment/make_payment", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentData),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return err.json();
    });
};

export const processOrder = (orderData) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/orders/order", JSON.stringify(orderData), {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const sendEmail = (emailData) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/messaging/email/sendemail", JSON.stringify(emailData), {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
