'use strict'

const express = require('express')
require('dotenv').config()
const CORS = require('cors')

const app = express()

/**app middlewares */
app.use(CORS())

const PORT = process.env.PORT | 5007

const paymentRouter = require('./src/routes/payment')

app.use('/api', paymentRouter)

app.listen(PORT, (err) => {
    if(err) {
        console.log(err)
    }else {
        console.log(`App listing on PORT ${PORT}`)
    }
})