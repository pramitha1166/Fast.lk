import React, {useState, useEffect} from 'react'
import 'braintree-web'
import DropIn from 'braintree-web-drop-in-react'
import {processPayment} from './coreAPI'

const PaymentForm = ({shippingData,clientToken}) => {

    const [data,setData] = useState({
        instance: {}
    })


    const buy = () => {
        let nonce;
        let getNonse = data.instance.requestPaymentMethod()
            .then(data=> {
                console.log(data)
                nonce = data.nonce

                const paymentData = {
                    paymentMethodNonse: nonce,
                    amount: 1000
                }

                console.log(paymentData)

                processPayment(paymentData)
                    .then(res=>console.log(res))
                    .catch(err=>console.log(err))

            })
            .catch(err=> {
                console.log(err)
            })
    }

    const showDropIn = () => (
        <div>
            <DropIn options={{
                authorization: clientToken
            }} onInstance={instance => (data.instance=instance)} />
            <button className="btn btn-success" onClick={buy}>Checkout</button>
        </div>
    )

    useEffect(() => {
      
    })

    return (
        <div>
            {showDropIn()}<br/>
            {JSON.stringify(shippingData)}
        </div>
    )
}

export default PaymentForm
