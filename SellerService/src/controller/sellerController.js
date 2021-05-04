const express = require("express");
const { addSeller, getSellerById, updateSeller, deleteSeller } = require("../service/sellerService");
const router = express.Router();

router.post('/add', addSeller);

router.get('/view/:id', getSellerById);

router.put('/update/:id', updateSeller);

router.delete('/delete/:id', deleteSeller);

module.exports = router;