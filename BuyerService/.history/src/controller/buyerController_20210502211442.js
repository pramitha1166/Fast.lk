const express = require("express");
const router = express.Router();
const { addBuyer, getBuyer } = require("../service/buyerService");

router.post('/add', addBuyer);
router.get('/view/:id', getBuyer);

module.exports = router;