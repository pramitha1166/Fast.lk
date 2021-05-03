"use strict"

const mongoose = require('mongoose')

const buyer_Schema = new mongoose.Schema({
    firstName : {
        type: String,
        required: tr
    }
}, {timestamps: true})

module.exports = mongoose.model("Order", Order_Schema)