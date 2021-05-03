"use strict"

const mongoose = require('mongoose')

const buyer_Schema = new mongoose.Schema({
    
    
    amount:{
        type: Number,
        trim: true,
        required: true,
        maxlength: 32
    },
    items: [
        {
            name: {
                type: String,
                required: true,
                min: 1,
                max: 255
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number
            }
        }
    ],
    billing: {
        name: {
            type: String,
            required: true
        },
        street: {
            type: String,
        },
        town_city: {
            type: String
        },
        county_state: {
            type: String
        },
        postal_zip_code: {
            type: Number
        },
        country: {
            type: String
        }
    }
}, {timestamps: true})

module.exports = mongoose.model("Order", Order_Schema)