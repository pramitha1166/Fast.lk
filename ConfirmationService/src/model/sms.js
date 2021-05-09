const mongoose = require('mongoose');

const smsSchema = new mongoose.Schema({
    messageRecipient: {
        type: String,
        required: true,
        min: 12,
        max: 12
    },
    messageBody: {
        type: String,
        require: true
    }
}, {timestamps: true});

module.exports = mongoose.model("Sms", smsSchema);