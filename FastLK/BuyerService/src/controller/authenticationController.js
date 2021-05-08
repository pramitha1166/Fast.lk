const express = require("express");
const router = express.Router();
const { login } = require("../service/authenticationService");

/** 
@todo: add addBuyer route here as register && remove it from comman API
*/
router.post('/login', login);

module.exports = router;
