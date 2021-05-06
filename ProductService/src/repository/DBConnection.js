"use strict";

const mongoose = require("mongoose");
const Product = require("./../model/product");

const DBConnection = (io) => {
  mongoose.connect(
    process.env.DATABASE_CREDENTIALS,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err) {
      if (err) {
        throw err;
      }
      console.log("Database connected");

      io.on("connection", (socket) => {
        console.log("user connected");
        socket.emit("hello", "world");
      });

      Product.watch().on("change", (change) => {
        console.log("Something has changed");
        io.to(change.fullDocument._id).emit("changes", change.fullDocument);
      });
    }
  );
};

module.exports = DBConnection;
