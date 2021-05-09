"use strict";

const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  receiver: {
    type: String,
    required: true,
    min: 4,
    max: 100,
  },
  title: {
    type: String,
    required: true,
    min: 4,
    max: 255,
  },
  subject: {
    type: String,
    required: true,
    min: 4,
    max: 255,
  },
  details: {
    type: String,
    required: true,
    min: 4,
    max: 1024,
  }
});

module.exports = mongoose.model("Email", emailSchema);