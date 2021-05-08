const express = require('express');
const { sendMessage } = require('../service/smsService');
const router = express.Router();

router.post('/', sendMessage);

module.exports = router;