import { Paper, Step, StepLabel, Stepper, Typography } from '@material-ui/core'
import React, {useState} from 'react'
import Layout from '../layout/Layout'
import AddressForm from './AddressForm'
import './Checkout.css'

import useStyles from './CheckoutStyle'
import PaymentForm from './PaymentForm'

const steps = ['Shipping Address', 'Payment Details']

const Checkout = () => {

    const classes = useStyles()

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
        ? <AddressForm next={next} />
        : <PaymentForm />

    const Confirm = () => (
        <h2>Success</h2>
    )

    return (
        <Layout title="Checkout">
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
        </Layout>
    )
}

export default Checkout
