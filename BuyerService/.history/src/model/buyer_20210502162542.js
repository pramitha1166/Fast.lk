"use strict"

const mongoose = require('mongoose')

const buyer_Schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    userName
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true, 
    },
    address: {
        houseNo: {
            type: String,
            required: true, 
        },
        streetName: {
            type: String,
            required: true,  
        },
        city: {
            type: String,
            required: true, 
        }
    },
    phoneNumber: {
        type: String,
        required: true,
    }
}, {timestamps: true})

module.exports = mongoose.model("Buyer", buyer_Schema)