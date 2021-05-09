'use strict';

const express = require('express');
const env = require('dotenv');
const cors = require('cors');
const app = express();
const fetch = require('node-fetch');
const emailRoute = require('./src/controller/emailController');
const smsRoute = require('./src/controller/smsController');

const PORT = process.env.PORT || 5001; 

//enable environment varbiable file
env.config();

//app middlewares

app.use(express.json());
app.use(cors());

//route middlewares
app.use('/api/messaging/email', emailRoute);
app.use('/api/messaging/sms', smsRoute);

app.listen(PORT, () => {
    console.log(`Messaging service started on port : ${PORT}`);
});