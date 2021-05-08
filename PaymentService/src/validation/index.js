'use strict'

const { object } = require('joi')
const Joi = require('joi')
const order = require('../../../OrderService/src/model/order')

exports.validatePayment = (payment) => {
    const schema = Joi.object({
        payment_id: Joi.number(),
        status: Joi.number(),
        amount: Joi.number(),
        currency: Joi.string().min(1).max(255),
        payment_method: {
            method: Joi.string(),
            card_customer_name: Joi.string().min(1).max(255),
            card_no: Joi.string().min(12).max(19)
        },
        amount_details: {
           currency: Joi.string().min(1).max(255),
           gross:  Joi.number(),
           fee: Joi.number(),
           net: Joi.number(),
           exchange_rate: Joi.number(),
           exchange_from: Joi.string(),
           exchange_to: Joi.string()
        },
        items: Joi.array().items({
            name: Joi.string(),
            quantity: Joi.number(),
            unit_price: Joi.number(),
            total_price: Joi.number()
        })
    })

    return schema.validate({
        payment_id : payment.payment_id
    })
}