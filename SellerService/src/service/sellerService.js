"use strict";

const Seller = require('../model/seller');

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

const getSeller = async (req, res) => {
   try {
    const currentSeller = await Seller.findById(req.params.id); 
    res.json(currentSeller);
   } catch (error) {
       res.status(400).json({ message: error.message });
   }
}

module.exports.addSeller = addSeller;
module.exports.getSeller = getSeller;