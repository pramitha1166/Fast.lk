const express = require('express');
const { sendMessage } = require('../service/smsService');
const router = express.Router();

router.post('/sendsms', sendMessage);

module.exports = router;