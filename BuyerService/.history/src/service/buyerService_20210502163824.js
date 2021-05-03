"use strict";

const Product = require("../model/buyer");

const addBuyer = async (req, res) => {
    const Buyer = req.body;
    const newSeller = new Seller(seller);
    try {
        await newSeller.save();
        res.status(201).json(newSeller); 
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}