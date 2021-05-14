import { Paper, Step, StepLabel, Stepper, Typography } from '@material-ui/core'
import React, {useState,useEffect} from 'react'
import Layout from '../layout/Layout'
import AddressForm from './AddressForm'
import './Checkout.css'
import axios from 'axios'

import useStyles from './CheckoutStyle'
import PaymentForm from './PaymentForm'
import LoaderSpinner from '../Comman/LoaderSpinner'
import { CartContext } from '../context/CartContextProvider'

const steps = ['Shipping Address', 'Payment Details']

const Checkout = () => {

    const classes = useStyles()

    const [cart,setCart] = useState([])
    const [loading, setLoading] = useState(false)
    const [activeStep,setActiveStep] = useState(0)
    const [shippingData,setShippingData] = useState({})
    const [clientToken, setClientToken] = useState(null)

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

    const next = (data) => {
        setShippingData(data)
        nextStep()
    }

    const Form = () => activeStep === 0 
        ? <AddressForm next={next} cart_data={cart} />
        : <PaymentForm shippingData={shippingData} clientToken={clientToken} />

    const Confirm = () => (
        <h2>Success</h2>
    )

    useEffect(() => {
        setLoading(true)
        axios.get('http://localhost:5007/api/payment/client_token')
        .then(data=> {
            setClientToken(data.data.clientToken)
            setLoading(false)
        })
        .catch(err=>{
            console.log(err)
            setLoading(false)
        })
    },[])

    return (
        <CartContext.Consumer>{(context) => {
             const {cartData} = context
             console.log(cartData)
             setCart(cartData)
            return (
                <Layout title="Checkout">
                    {loading ? (
                        <LoaderSpinner/>
                    ) : (
                        <>
                            <div className={classes.toolbar} />
                            <main className={classes.layout}>
                                <Paper className={classes.paper}>
                                    <Stepper activeStep={activeStep} className={classes.stepper}>
                                        {steps.map((step) => (
                                            <Step key={step}>
                                                <StepLabel>{step}</StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                    {activeStep===steps.length ? <Confirm/> : <Form />}
                                </Paper>
                            </main>
                        </>
                    )}
                
                </Layout>
            )
        }}
           
        </CartContext.Consumer>
        
    )
}

export default Checkout
