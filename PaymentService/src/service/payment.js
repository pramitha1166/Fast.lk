'use srtict'

const braintree = require('braintree')
require('dotenv').config()

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.MERCHANTID,
    publicKey: process.env.PUBLICKEY,
    privateKey: process.env.PRIVATEKEY
})

exports.generateClientTokenService = () => {
  
    return new Promise((resolve,reject) => {
     
        gateway.clientToken.generate({}, (err,res) => {
            if(err) {
                reject(err)
            }else {
                resolve(res)
            }
        })
    })

}

exports.makePaymentService = (payment) => {
    return new Promise((resolve,reject) => {
        let newTransaction = gateway.transaction.sale({
            amount: payment.amount,
            paymentMethodNonce: payment.nonse,
            options: {
                submitForSettlement: true
            }
        }, (err,result) => {
            if(err) {
                reject(err)
            }else {
                resolve(result)
            }
        })
    })
}