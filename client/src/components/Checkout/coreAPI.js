import axios from 'axios'

export const processPayment = (paymentData) => {

    return fetch('http://localhost:5007/api/payment/make_payment', {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(paymentData)
    }).then(res=> {
         return res.json()
    }).catch(err => {
         return err.json()
    })
}