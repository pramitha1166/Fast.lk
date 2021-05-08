'use strict'

const {createPaymetService,getPaymentsService,getPaymentByIdService,deletePaymentService,updatePaymentService} = require('../service/payments')

exports.createPayment = async(req,res) => {
    try {
        const result = await createPaymetService(req.body)
        res.json(result)   
    } catch (err) {
        res.status(400).json({
            "error": err
        })
    }
}

exports.getPayments = async(req,res) => {
    try {
        const result = await getPaymentsService(req.query)
        res.json(result)
    } catch (err) {
        res.status(400).json({
            "error": err
        })
    }    
}


exports.getPaymentById = async(req,res,next,id) => {
    try {
        const result = await getPaymentByIdService(id)
        req.payment = result
        next()
    } catch (err) {
        res.status(400).json({
            "error": "error with get item "+ err
        })
    }
}

exports.getSinglePayment = (req,res) => {
    res.json(req.payment)
}

exports.deletePayment = async(req,res) => {
    try {
        const result = await deletePaymentService(req.payment)
        res.json({
            'message': 'Item has been deleted successfully',
            result
        })
    } catch (err) {
        res.status(400).json({
            "error": err
        })
    }
}

exports.updatePayment = async(req,res) => {
    try {
        const result = await updatePaymentService(req.payment,req.body)
        res.json({
            'message': 'Item has been updated successfully',
            result
        })
    } catch (err) {
        res.status(400).json({
            "error": err
        })
    }
}



