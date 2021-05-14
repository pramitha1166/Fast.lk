'use strict'

const express = require('express')

const router = express.Router()

const {generateClientToken, makePayment} = require('../controller/payment')

router.get('/payment/client_token', generateClientToken)

router.post('/payment/make_payment', makePayment)

module.exports = router