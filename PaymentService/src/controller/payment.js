'use strict'

const {generateClientTokenService,makePaymentService} = require('../service/payment')

exports.generateClientToken = async(req,res) => {
    try {
        const result = await generateClientTokenService();
        res.json(result)
    } catch (err) {
        res.status(400).json(err)
    }
}

exports.makePayment = async(req,res) => {
    try {
        const payment = {
            nonse: req.body.paymentMethodNonse,
            amount: req.body.amount
        }
        const result = await makePaymentService(payment)
        res.json(result)

    } catch (err) {
        res.status(400).json(err)
    }
}