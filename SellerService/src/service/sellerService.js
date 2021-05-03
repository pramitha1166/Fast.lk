"use strict";

const Seller = require('../model/seller');

const addSeller = async (req, res) => {
    const seller = req.body;
    const newSeller = new Seller(seller);

    try {
        await newSeller.save();
        res.status(201).json('New seller added'); 
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const getSellerById = async (req, res) => {
   try {
    const currentSeller = await Seller.findById(req.params.id); 
    res.json(currentSeller);
   } catch (error) {
       res.status(200).json('No user with given ID');
   }
}

const updateSeller = async (req, res) => {
    try{
        const sellerToUpdate = await Seller.findById(req.params.id); 
        
        sellerToUpdate.firstName = req.body.firstName;
        sellerToUpdate.lastName = req.body.lastName;
        sellerToUpdate.username = req.body.username;
        sellerToUpdate.password = req.body.password;
        sellerToUpdate.email = req.body.email;
        sellerToUpdate.mobileNo = req.body.mobileNo;
        sellerToUpdate.address = req.body.address;

        await sellerToUpdate.save();
        res.json('Seller updated');

    } catch(error) {
        res.status(400).json('No such user');
    }
}

const deleteSeller = async (req, res) => {
    try{
        await Seller.findOneAndRemove(req.params.id).exec();
        res.json('Successfully deleted');
    } catch(error) {
        res.json({ message:'Error! Could not delete' });
    }
}

module.exports.addSeller = addSeller;
module.exports.getSellerById = getSellerById;
module.exports.updateSeller = updateSeller;
module.exports.deleteSeller = deleteSeller;