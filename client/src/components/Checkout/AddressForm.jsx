import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";

import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";

const AddressForm = ({ next, cart_data }) => {
  const alert = useAlert();

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    address: "",
    email: "",
    city: "",
    zip: "",
  });

  const [error, setError] = useState([]);

  const handleForm = (name) => (event) => {
    if (name === "email") {
      if (event.target.value !== isAuthenticated().email) {
        //alert.error('Please Enter Your LogedIn Email')
        setError(["Please Enter Your LogedIn Email"]);
      } else {
        setData({
          ...data,
          email: event.target.value,
        });
        setError([]);
      }
    } else {
      setData({
        ...data,
        [name]: event.target.value,
      });
    }
  };

  const submitForm = (event) => {
    event.preventDefault();
    console.log(error.length);
    if (error.length > 0) {
      error.forEach((err) => {
        alert.error(err);
      });
    } else {
      next({ ...data });
    }
  };

  let total = 0;

  return (
    <div>
      <h6 className="title">Order Summery</h6>
      <Paper style={{ marginBottom: "40px", marginTop: "20px" }}>
        <Table style={{ alignItems: "center" }}>
          <TableContainer>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Unit Price</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart_data.map((data) => {
                total = total + data.quantity * data.price;
                return (
                  <TableRow>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>{data.quantity}</TableCell>
                    <TableCell>{data.price}</TableCell>
                    <TableCell>{data.price * data.quantity}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableHead>
              <TableRow>
                <TableCell>Total Amount</TableCell>
                <TableCell></TableCell>
                <TableCell>{total}</TableCell>
              </TableRow>
            </TableHead>
          </TableContainer>
        </Table>
      </Paper>

      <h6 className="title">Shipping Address</h6>

      <form onSubmit={submitForm}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            {/* <TextField id="firstname" required  fullWidth label="First Name" onChange={handleForm('firstname')}  />
             */}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                onChange={handleForm("firstname")}
              />
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            {/* <TextField id="lastname" required fullWidth label="Last Name" onChange={handleForm('lastname')} />    */}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                onChange={handleForm("lastname")}
              />
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            {/* <TextField id="address" required fullWidth label="Address"  onChange={handleForm('address')} />    */}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Address"
                onChange={handleForm("address")}
              />
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            {/* <TextField id="email" required fullWidth label="Email" onChange={handleForm('email')}  />    */}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                onChange={handleForm("email")}
              />
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            {/* <TextField id="city" required fullWidth label="City" onChange={handleForm('city')} />    */}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="City"
                onChange={handleForm("city")}
              />
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            {/* <TextField id="zip" required fullWidth label="ZIP" onChange={handleForm('zip')}  />    */}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="ZIP"
                onChange={handleForm("zip")}
              />
            </div>
          </Grid>
        </Grid>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "60px",
          }}
        >
          <button class="btn btn-default" variant="outlined">
            <Link to="/">Back to Home</Link>
          </button>
          <button
            class="btn btn-danger"
            type="submit"
            color="primary"
            variant="contained"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
