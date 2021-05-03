const express = require("express");
const router = express.Router();
const { addBuyer, getBuyer } = require("../service/buyerService");

router.post('/addBuyer', addBuyer);
router.get('/viewBuyer/:id', getBuyer);
router.patch('/updateBuyer/:id', getBuyer);
router.delete('/updateBuyer/:id', getBuyer);

module.exports = router;