require('dotenv').config();
const { TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN } = require('../util/twilio_crendentials');

const accountSid = TWILIO_ACCOUNT_SID;
const authToken = TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendSMS = (smsObj) => {

    const { messageRecipient, messageBody } = smsObj;

    client.messages
        .create({
            body: messageBody,
            from: '+15134405197',
            to: messageRecipient
        })
        .then(message => console.log(message.sid))
        .catch(error => console.log(error))
}

module.exports.sendSMS = sendSMS;