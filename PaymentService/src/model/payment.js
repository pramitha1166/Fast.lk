'use strict'

const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({
    payment_id: {
        type: Number
    },
    status: {
        type: Number
    },
    amount: {
        type: Number
    },
    currency: {
        type: String
    },
    payment_method: {
        method: {
            type: String
        },
        card_customer_name: {
            type: String
        },
        card_no: {
            type: String
        }
    },
    amount_details: {
        currency: {
            type: String
        },
        gross: {
            type: Number
        },
        fee: {
            type: Number
        },
        net: {
            type: Number
        },
        exchange_rate: {
            type: Number
        },
        exchange_from: {
            type: String
        },
        exchange_to: {
            type: String
        }
    },
    items: [
        {
            name: {
                type: String
            },
            quantity: {
                type: Number
            },
            unit_price: {
                type: Number
            },
            total_price: {
                type: String
            }
        }
    ]
    
}, {timestamps: true})

module.exports = mongoose.model('Payment', PaymentSchema)