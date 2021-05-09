'use strict';
const Sms = require('../model/sms');
const { sendSMS } = require('./sendMessage');

const sendMessage = async (req, res) => {
    try{
        const messageRecipient = process.env.MOBILE_NUMBER;
        const messageBody = 
        `Your mobile account ${messageRecipient} has been debited for your purchase at FastLK`;
    
        const newSms = new Sms({
            messageRecipient,
            messageBody
        });
        
        sendSMS(newSms);

        res.status(201).json({ msg: 'Message sent' });

    } catch(error) {
        console.log(error);
    }
}

module.exports.sendMessage = sendMessage;