'use strict';

const express = require('express');
const env = require('dotenv');
const cors = require('cors');
const app = express();
const mongoose

app.use(express.json());
app.use(cors());
env.config();

const PORT = process.env.PORT || 5005; 

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
  }, () => { console.log("Database connected") });

app.listen(PORT, () => {
    console.log(`Buyer service started on port : ${PORT}`);
});


