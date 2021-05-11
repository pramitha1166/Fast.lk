'use strict'

const express = require('express')

const router = express.Router()

const {generateClientToken} = require('../controller/payment')

router.get('/payment/client_token', generateClientToken)

module.exports = router