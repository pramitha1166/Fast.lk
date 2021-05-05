'use strict';

const express = require('express');
const env = require('dotenv');
const cors = require('cors');
const app = express();
const fetch = require('node-fetch');
const emailRoute = require('./src/controller/emailController');

//enable environment varbiable file
env.config();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5001; 

app.listen(PORT, () => {
    console.log(`email service started on port : ${PORT}`);
});

app.use('/api/email', emailRoute);



