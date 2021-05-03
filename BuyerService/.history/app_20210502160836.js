'use strict';

const express = require('express');
const env = require('dotenv');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
env.config();

const emailRoute = require('./src/controller/emailController');

const PORT = process.env.PORT || 5005; 

app.listen(PORT, () => {
    console.log(`Buyer service started on port : ${PORT}`);
});


