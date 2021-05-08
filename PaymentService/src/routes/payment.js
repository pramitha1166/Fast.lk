'use strict'

const express = require('express')
const router = express.Router()

const {createPayment,getPayments,deletePayment,updatePayment,getPaymentById,getSinglePayment} = require('../controller/payment')

router.post('/payment', createPayment)
router.get('/payments', getPayments)
router.get('/payment/:paymentId', getSinglePayment)
router.delete('/payment/:paymentId', deletePayment)
router.put('/payment/:paymentId', updatePayment)

router.param('paymentId', getPaymentById)

module.exports = router