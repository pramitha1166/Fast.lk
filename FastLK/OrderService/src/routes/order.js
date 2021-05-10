const express = require("express");
const router = express.Router();
const validateToken = require("./../validation/validateToken");
const {
  getAllOrders,
  createOrder,
  getOrderById,
  getSingleOrder,
  deleteOrder,
  updateOrder,
} = require("../controller/order");

router.get("/order", getAllOrders);
router.post("/order", validateToken, createOrder);
router.get("/order/:orderId", validateToken, getSingleOrder);
router.delete("/order/:orderId", validateToken, deleteOrder);
router.put("/order/:orderId", validateToken, updateOrder);

router.param("orderId", validateToken, getOrderById);

module.exports = router;
