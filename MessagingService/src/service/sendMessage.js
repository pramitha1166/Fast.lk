require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;

const data = process.env.TWILIO_AUTH_TOKEN;
const buff = Buffer.from(data, 'base64');
const authToken = buff.toString('ascii');

const client = require('twilio')(accountSid, authToken);

const sendSMS = (smsObj, res) => {

    const { messageRecipient, messageBody } = smsObj;

    client.messages
        .create({
            body: messageBody,
            from: '+15134405197',
            to: messageRecipient
        })
        .then(message => {
            res.status(202).json({ msg: "Message sent" });
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ msg: "Message not sent" });
        });
}

module.exports.sendSMS = sendSMS;