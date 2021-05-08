const express = require('express');
const env = require("dotenv");
const cors = require("cors");
const app = express();
const mongoose = require('mongoose');

app.use(express.json());
app.use(cors());
env.config();

const PORT = process.env.PORT || 5006; 

mongoose.connect(process.env.CONNECTION_URL, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
}, () => { console.log("Database connected") });

const smsRoute = require('./src/controller/smsController');

app.listen(PORT, () => console.log(`Server Started on port: ${PORT}`));

app.use('/api/sms', smsRoute);