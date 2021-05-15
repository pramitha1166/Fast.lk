"use strict"
const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    
    username: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 15
    },
    password: {
        type: String,
        required: true,
        trim: true,
        min: 6
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    mobileNo: {
        type: String,
        required: true,
        min: 10,
        max: 10
    },
    address: {
        houseNumber: {
            type: String,
            required: true,
        },
        streetName: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true,
            min: 3
        }
    }, 
    profilePic: {
        type: String,
        require: false
    }
}, {timestamps: true});

module.exports = mongoose.model("Seller", sellerSchema);
