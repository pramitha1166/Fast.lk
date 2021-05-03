const express = require("express");
const router = express.Router();
const { addBuyer, getBuyer, getAllBuyers, updateBuyer, deleteBuyer } = require("../service/buyerService");

router.post('/addBuyer', addBuyer);
router.get('/getAllBuyers', getAllBuyers);
router.get('/Buyer/:id', getBuyer);
router.patch('/updateBuyer/:id', updateBuyer);
router.delete('/removeBuyer/:id', deleteBuyer);

module.exports = router;

//{"_id":{"$oid":"608e8cf621ec85416c39bab8"},"firstName":"Tom","lastName":"Jon","userName":"tomjon","password":"tom123","email":"tom@gmail.com","phoneNumber":"0768812527","address":{"houseNo":"45G","streetName":"Abc","city":"Ddddeg"},"createdAt":{"$date":{"$numberLong":"1619954934410"}},"updatedAt":{"$date":{"$numberLong":"1619954934410"}},"__v":{"$numberInt":"0"}}