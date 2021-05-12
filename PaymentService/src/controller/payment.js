'use strict'

const {generateClientTokenService} = require('../service/payment')

exports.generateClientToken = async(req,res) => {
    try {
        const result = await generateClientTokenService();
        res.json(result)
    } catch (err) {
        res.status(400).json(err)
    }
}