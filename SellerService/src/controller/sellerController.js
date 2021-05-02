const express = require("express");
const { addSeller, getSeller } = require("../service/sellerService");
const router = express.Router();

router.post('/add', addSeller);

router.get('/view/:id', getSeller);

module.exports = router;