import { Paper, Step, StepLabel, Stepper, Typography } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import Layout from "../layout/Layout";
import AddressForm from "./AddressForm";
import "./Checkout.css";
import axios from "axios";

import useStyles from "./CheckoutStyle";
import PaymentForm from "./PaymentForm";
import LoaderSpinner from "../Comman/LoaderSpinner";
import { CartContext } from "./../../context/CartContext";

const steps = ["Shipping Address", "Payment Details"];

const Checkout = (props) => {
  const classes = useStyles();

  let cartD = [];

  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const [clientToken, setClientToken] = useState(null);
  const [cartData, setCartData] = useContext(CartContext);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm next={next} cart_data={cartData} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        clientToken={clientToken}
        cart_data={cartData}
        nextStep={nextStep}
        history={props.history}
      />
    );

  const Confirm = () => (
    <h2
      style={{
        padding: "10px",
        borderRadius: "10px",
        backgroundColor: "InfoBackground",
      }}
    >
      Success
    </h2>
  );

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5007/api/payment/client_token")
      .then((data) => {
        setClientToken(data.data.clientToken);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <Layout title="Checkout">
      {activeStep === 3 ? (
        <>{Confirm()}</>
      ) : (
        <div>
          {loading ? (
            <LoaderSpinner />
          ) : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className={classes.toolbar} />
              <main className="card">
                <div className="card-body">
                  <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((step) => (
                      <Step key={step}>
                        <StepLabel>{step}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                  {activeStep === steps.length ? <Confirm /> : <Form />}
                </div>
              </main>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default Checkout;
