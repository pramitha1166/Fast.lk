"use strict";

const Seller = require('../model/seller');
const { validateSeller } = require('./sellerValidation');
const bcrypt = require('bcryptjs');

const addSeller = async (req, res) => {
    const seller = req.body;
    let newSeller = await validateSeller(seller);

    try {
        if(newSeller === 0) {
            res.status(400).json({ msg: 'Please enter all fields' });
        } else if(newSeller === 1) {
            res.status(400).json({ msg: 'User already exists' });
        } else {
            newSeller = new Seller(seller);
            newSeller.password = bcrypt.hashSync(newSeller.password, 10);
            await newSeller.save();
            res.status(201).json({ msg:'User added' });     
        }
    } catch (error) {
        console.log(error);
        res.status(409).json({ msg: 'User not created' });
    }
}

const getSellerById = async (req, res) => {
   try {
    const currentSeller = await Seller.findById(req.params.id); 
    res.json(currentSeller);
   } catch (error) {
       res.status(200).json({ msg:'No user with given ID' });
   }
}

const updateSeller = async (req, res) => {
    try{
        const sellerToUpdate = await Seller.findById(req.params.id); 
        
        sellerToUpdate.firstName = req.body.firstName;
        sellerToUpdate.lastName = req.body.lastName;
        sellerToUpdate.username = req.body.username;
        sellerToUpdate.password = bcrypt.hashSync(req.body.password, 10);
        sellerToUpdate.email = req.body.email;
        sellerToUpdate.mobileNo = req.body.mobileNo;
        sellerToUpdate.address = req.body.address;

        await sellerToUpdate.save();
        res.json({ msg:'Seller updated' });

    } catch(error) {
        res.status(400).json({ msg:'No such user' });
    }
}

const deleteSeller = async (req, res) => {
    try{
        await Seller.findOneAndRemove(req.params.id).exec();
        res.json({ msg:'Successfully deleted' });
    } catch(error) {
        res.json({ msg:'Error! Could not delete' });
    }
}

module.exports.addSeller = addSeller;
module.exports.getSellerById = getSellerById;
module.exports.updateSeller = updateSeller;
module.exports.deleteSeller = deleteSeller;