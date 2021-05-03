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

const getAllBuyers = async (req, res) => {
    try {
     const currentBuyer = await Buyer.find(); 
     res.json(currentBuyer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
 }

const getBuyer = async (req, res) => {
    try {
     const currentBuyer = await Buyer.findById(req.params.id); 
     res.json(currentBuyer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
 }

 const updateBuyer = async (req, res) => {
    try {
        const currentBuyer = await Buyer.findById(req.params.id);
        currentBuyer.firstName = req.firstName;
        currentBuyer.lastName = req.lastName;
        currentBuyer.userName = req.userName;
        currentBuyer.email = req.email;
        currentBuyer.password = req.password;
        currentBuyer.phoneNumber = req.phoneNumber;
        currentBuyer.address.houseNo = req.address.houseNo;
        currentBuyer.address.streetName = req.address.streetName;
        currentBuyer.address.city = req.address.city;
        await changeBuyer.save();
        res.status(201).json(changeBuyer); 
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const deleteBuyer = async (req, res) => {
    try {
        const currentBuyer = await Buyer.findById(req.params.id);
        await changeBuyer.remove();
        res.status(201).json(changeBuyer); 
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
 }

module.exports.addBuyer = addBuyer;
module.exports.getAllBuyers = getAllBuyers;
module.exports.getBuyer = getBuyer;
module.exports.updateBuyer = updateBuyer;
module.exports.deleteBuyer = deleteBuyer;