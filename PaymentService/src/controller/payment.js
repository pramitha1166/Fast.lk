'use strict'

const {createPaymentService} = require('../service/payment')
const {Customer,CheckoutParams,CurrencyType,PayhereCheckout} = require('payhere-js-sdk')

exports.createPayment = async(req,res) => {
    try {
        
       
        const result = await createPaymentService(custoer,checkoutData)
        res.json({
            'message': 'payment success'
        })

    } catch (err) {
        res.json({
            err
        })
    }
}

exports.createPayments = (req,res) => {
    const customer = new Customer({
        first_name: "Pavindu",
        last_name: "Lakshan",
        phone: "+94771234567",
        email: "plumberhl@gmail.com",
        address: "No. 50, Highlevel Road",
        city: "Panadura",
        country: "Sri Lanka",
    })

    const checkoutData = new CheckoutParams({
        returnUrl: 'http://localhost:3000/return',
        cancelUrl: 'http://localhost:3000/cancel',
        notifyUrl: 'http://localhost:8080/notify',
        order_id: '1234234',
        itemTitle: 'Demo item 2',
        amount:200,
        currency: CurrencyType.LKR,
    })

    const checkout = new PayhereCheckout(customer,checkoutData,(err) => {
        //res.json({'error':err})
    })
    checkout.start()
    res.json({'message':'payment success'})

}