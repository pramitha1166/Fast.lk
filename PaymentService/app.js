'use strict'

const express = require('express')
const app = express()
require('dotenv').config()
const CORS = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const mogoose = require('mongoose')

const PORT = process.env.PORT || 5005

/**import routes */
const payment_router = require('./src/routes/payment')

/**connect with DB */
mogoose.connect(process.env.DATABASE, (err) => {
    if(err) {
        console.log(err)
    }else {
        console.log('Connected with DB')
    }
})

/**app middlewares */
app.use(morgan('dev'))
app.use(bodyParser())
app.use(cookieParser())
app.use(CORS())

/**routing middlewares */
app.use('/api', payment_router)

app.get('/api', (req,res) => {
    res.json({
        'Hello': 'Payment Service'
    })
})

app.listen(PORT, (err) => {
    if(err) {
        console.log(err)
    }else {
        console.log(`App Listning on PORT: ${PORT}`)
    }
})