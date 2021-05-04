"use strict";

const mongoose = require("mongoose");

const DBConnection = () => {
  mongoose.connect(
    process.env.DATABASE_CREDENTIALS,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Database connected");
    }
  );
};

module.exports = DBConnection;

