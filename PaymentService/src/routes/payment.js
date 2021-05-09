'use strict'

const express = require('express')

const router = express.Router()

const {createPayment,createPayments} = require('../controller/payment')

router.get('/payment', createPayments)

module.exports = router