'use strict'

const Payment = require('../model/payment')
const {validatePayment} = require('../validation/index')

exports.createPaymetService = (payment_doc) => {
    return new Promise((resolve,reject) => {
        const payment = new Payment(payment_doc)

        const validate = validatePayment(payment)

        if(validate.error!==undefined) {
            reject(validate.error.details[0].message)
        }

        payment.save((err,payment) => {
            if(err) {
                reject(err)
            }else {
                resolve(payment)
            }
        })

    })
}

exports.getPaymentsService = (query) => {
    return new Promise((resolve,reject) => {

        let limit = query.limit ? query.limit : 10 ;

        Payment.find()
            .limit(limit)
            .exec((err,res) => {
                if(err) {
                    reject(err)
                }else{
                    resolve(res)
                }
            })
    })
}

exports.getPaymentByIdService = (id) => {
    return new Promise((resolve,reject) => {
        Payment.findById(id).exec((err,response) => {
            if(err) {
                reject(err)
            }else {
                resolve(response)
            }
        })
    })
}

exports.deletePaymentService = (payment) => {
    return new Promise((resolve,reject) => {
        payment.remove((err,item) => {
            if(err) {
                reject(err)
            }else {
                resolve(item)
            }
        })
    }) 
}


exports.updatePaymentService = (payment,body) => {
    return new Promise((resolve,reject) => {
        payment.payment_id = body.payment_id
        payment.status = body.status
        payment.amount = body.amount
        payment.currency = body.currency
        payment.payment_method = body.payment_method
        payment.amount_details = body.amount_details
        payment.items = body.items

        payment.save((err,response) => {
            if(err) {
                reject(err)
            }else {
                resolve(response)
            }
        })
    }) 
} 