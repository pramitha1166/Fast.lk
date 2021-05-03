"use strict";

const Buyer = require("../model/buyer");

const addBuyer = async (req, res) => {
    const buyer = req.body;
    const newBuyer = new Buyer(buyer);
    console.log(newBuyer);
    try {
        await newBuyer.save();  
        res.status(201).json(newBuyer); 
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const getAllBuyers = async (req, res) => {
    try {
     const allBuyers = await Buyer.find(); 
     res.json(allBuyers);
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
        console.log(currentBuyer);
        currentBuyer.firstName = req.body.firstName;
        currentBuyer.lastName = req.body.lastName;
        currentBuyer.userName = req.body.userName;
        currentBuyer.email = req.body.email;
        currentBuyer.password = req.password;
        currentBuyer.phoneNumber = req.phoneNumber;
        currentBuyer.address = req.address;
        await currentBuyer.save();
        res.status(201).json(currentBuyer); 
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