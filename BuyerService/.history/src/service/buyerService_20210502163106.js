const express = require('express')
const router = express.Router()
const {getAllOrders,createOrder} = require('../controller/buyer')

router.get('/order', getAllOrders)
router.post('/order', createOrder)

module.exports = router