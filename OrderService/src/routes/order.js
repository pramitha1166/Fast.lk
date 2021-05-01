const express = require('express')
const router = express.Router()
const {getAllOrders} = require('../controller/order')

router.get('/products', getAllOrders)

module.exports = router