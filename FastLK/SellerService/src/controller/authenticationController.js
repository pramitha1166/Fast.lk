const express = require("express");
const router = express.Router();
const { login } = require("../service/authenticationService");

router.post('/login', login);

module.exports = router;
