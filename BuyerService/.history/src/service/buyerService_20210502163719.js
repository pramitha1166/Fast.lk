"use strict";

const Product = require("../model/buyer");

const addSeller = async (req, res) => {
    const seller = req.body;
    const newSeller = new Seller(seller);
    try {
        await newSeller.save();
        res.status(201).json(newSeller); 
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}