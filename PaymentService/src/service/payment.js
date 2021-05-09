'use srtict'

const {PayhereCheckout} = require('payhere-js-sdk')

exports.createPaymentService = (customer_data,checkoutData_data) => {
    return new Promise((resolve,reject) => {

        const checkout = new PayhereCheckout(customer_data,checkoutData_data,(err) => {
            reject(err)
        })
        checkout.start()
        resolve()

    })
}