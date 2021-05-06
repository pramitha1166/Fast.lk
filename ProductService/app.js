"use strict";

const express = require("express");
const env = require("dotenv");
const cors = require("cors");
const app = express();

//db connection
const DBConnection = require("./src/repository/DBConnection");
//routes
const productRoute = require('./src/controller/productController');

const PORT = process.env.PORT || 5003;

//enable environment varbiables file
env.config();

//create DB connection
DBConnection();

//app middlewares
app.use(express.json());
app.use(cors());

//route middlewares
app.use('/api/product', productRoute);

app.listen(PORT, () => console.log(`Server Started on port: ${PORT}`));
