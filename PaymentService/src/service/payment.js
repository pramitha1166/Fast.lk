'use srtict'

const braintree = require('braintree')
require('dotenv').config()

exports.generateClientTokenService = () => {
  
    return new Promise((resolve,reject) => {
        const gateway = new braintree.BraintreeGateway({
            environment: braintree.Environment.Sandbox,
            merchantId: process.env.MERCHANTID,
            publicKey: process.env.PUBLICKEY,
            privateKey: process.env.PRIVATEKEY
        })

        gateway.clientToken.generate({}, (err,res) => {
            if(err) {
                reject(err)
            }else {
                resolve(res)
            }
        })
    })



}