import React, {useState, useEffect} from 'react'
import 'braintree-web'
import DropIn from 'braintree-web-drop-in-react'

import {processPayment, processOrder} from './coreAPI'

const PaymentForm = ({shippingData,clientToken,cart_data}) => {

    const [data,setData] = useState({
        instance: {}
    })

    let tot = 0;

    let cart_array = []

    
    const getCartTotal = () => {
        cart_data.map((data) => {
            tot = tot + data.quantity*data.price
        })
        //setOrder({...order, amount: tot})
        return tot
    }

    const getCartItemArray = () => {
        cart_data.map((data) => {
            console.log(data)
            delete data.img
            delete data._id
            console.log(data)
            cart_array.push(data)
        })
        console.log(cart_array)
        return cart_array
        //setOrder({...order, items: cart_array})
    } 

    const [order,setOrder] = useState({
        customer: {
            firstname: shippingData.firstname,
            lastname: shippingData.lastname,
            email: shippingData.email
        },
        amount: getCartTotal(),
        items: getCartItemArray(),
        billing: {
            name: shippingData.firstname,
            street: '',
            town_city: shippingData.city,
            country_state: '',
            postal_zip_code: shippingData.zip,
            country: ''
        }
    })


   const test = () => {
    getCartItemArray()
   }

    const buy = () => {

        console.log(order)
        let nonce;
        let getNonse = data.instance.requestPaymentMethod()
            .then(data=> {
                console.log(order)
                console.log(data)
                nonce = data.nonce

                const paymentData = {
                    paymentMethodNonse: nonce,
                    amount: order.amount
                }

                console.log(paymentData)

                processPayment(paymentData)
                    .then(res=>console.log(res))
                    .catch(err=>console.log(err))

                processOrder(order)
                    .then(res=>console.log(res))
                    .catch(err=>console.log(err))

            })
            .catch(err=> {
                console.log(err)
            })
    }

    const showDropIn = () => (
        <div>
            {/* {JSON.stringify(order)} */}
            <DropIn options={{
                authorization: clientToken
            }} onInstance={instance => (data.instance=instance)} />
            <button className="btn btn-danger" onClick={buy}>Checkout</button>

        </div>
    )

    useEffect(() => {
       // setCartTotal()
       // setCartItemArray()
    })

    return (
        <div >
            {showDropIn()}<br/>
            {/* {JSON.stringify(shippingData)} */}
        </div>
    )
}

export default PaymentForm
