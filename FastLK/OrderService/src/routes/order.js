const express = require('express')
const router = express.Router()
const {getAllOrders,createOrder,getOrderById,getSingleOrder,deleteOrder,updateOrder} = require('../controller/order')

router.get('/order', getAllOrders)
router.post('/order', createOrder)
router.get('/order/:orderId', getSingleOrder)
router.delete('/order/:orderId', deleteOrder)
router.put('/order/:orderId', updateOrder)

router.param('orderId', getOrderById)

module.exports = router