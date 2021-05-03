const express = require("express");
const router = express.Router();
const { addBuyer, get } = require("../service/buyerService");

router.post('/add', addBuyer);
router.get('/view/:id', getSeller);

module.exports = router;