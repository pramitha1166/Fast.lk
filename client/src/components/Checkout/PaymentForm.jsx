import React from 'react'

const PaymentForm = ({shippingData,clientToken}) => {
    return (
        <div>
            Payment Form<br/>
            {JSON.stringify(shippingData)}
        </div>
    )
}

export default PaymentForm
