"use strict";

const express = require("express");
const env = require("dotenv");
const cors = require("cors");
const app = express();
const DBConnection = require("./src/repository/DBConnection");

app.use(express.json());
app.use(cors());
env.config();

DBConnection();

const PORT = process.env.PORT || 5003;

app.listen(PORT, () => console.log(`Server Started on port: ${PORT}`));
