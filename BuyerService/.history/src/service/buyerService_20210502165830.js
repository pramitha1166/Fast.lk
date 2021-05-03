"use strict";

const Buyer = require("../model/buyer");

const addBuyer = async (req, res) => {
    const buyer = req.body;
    const newBuyer = new Buyer(buyer);
    try {
        await newBuyer.save();
        res.status(201).json(newBuyer); 
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

module.exports.addBuyer = addBuyer;