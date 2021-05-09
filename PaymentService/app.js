'use strict'

const express = require('express')
require('dotenv').config()
const app = express()

const {Payhere,AccountCategory} = require('payhere-js-sdk')

const paymentRouter = require('./src/routes/payment')

const PORT = process.env.PORT | 5003

Payhere.init("1217233",AccountCategory.SANDBOX)


app.use('/api', paymentRouter)

app.listen(PORT, (err) => {
    if(err) {
        console.log(err)
    }else {
        console.log(`App listing on PORT ${PORT}`)
    }
})