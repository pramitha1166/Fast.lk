'use strict';

const express = require('express');
const env = require('dotenv');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
env.config();

const emailRoute = require('./routes/email/email');

const PORT = process.env.PORT || 5001; 

app.listen(PORT, () => {
    console.log(`email service started on port : ${PORT}`);
});

app.use('/api/email', emailRoute);


