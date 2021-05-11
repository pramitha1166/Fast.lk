'use strict';
require('dotenv').config();
const Sms = require('../model/sms');
const { sendSMS } = require('./sendMessage');

const sendMessage = async (req, res) => {

    const messageRecipient = process.env.MOBILE_NUMBER;
    const messageBody = 
    `Your mobile account ${messageRecipient} has been debited for your purchase at FastLK`;

    const newSms = new Sms({
        messageRecipient,
        messageBody
    });
    
    sendSMS(newSms, res);
}

module.exports.sendMessage = sendMessage;