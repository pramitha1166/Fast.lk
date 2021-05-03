const express = require('express')
const router = express.Router()
const {getAllOrders,createOrder} = require('../controller/buyerController')

router.get('/order', getAllOrders)
router.post('/order', createOrder)

module.exports = router