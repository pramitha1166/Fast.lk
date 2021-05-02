'use strict'

const Order = require('../model/order')

exports.getAllOrders = (req,res) => {

    let sortBy = req.query.sortBy ? req.query.sortBy: '_id'
    let orderBy = req.query.orderBy ? req.query.orderBy: 'asc'  
    let limit = req.query.limit ? req.query.limit : 10

    Order.find()
        .limit(limit)
        .exec((err,order) => {
            if(err) {
                return res.status(400).json({
                    error: err
                })
            }else {
                res.json(order)
            }
        })
}

exports.createOrder = (req,res) => {
    console.log(req.body)
    const order = new Order(req.body)
    order.save((err,order)=> {
        if(err) {
            return res.status(400).json({
                error: err
            })
        }else {
            res.json({order})
        }
    })
}

exports.getOrderById = (req,res,next,id) => {
    Order.findById(id).exec((err,order) => {
        if(err) {
            return res.status(400).json({
                error: err
            })
        }else {
            req.order = order
            next()
        }
    })
}

exports.getSingleOrder = (req,res) => {
    return res.json(req.order)
}

exports.deleteOrder = (req,res) => {
    const order = req.order
    order.remove((err,order) => {
        if(err) {
            return res.status(400).json({
                error: err
            })
        }else {
            res.json({
                'message':'Order has been deleted',
                order
            })
        }
    })
}

exports.updateOrder = (req,res) => {
    const order = req.order
    order.customer = req.body.customer
    order.amount = req.body.amount
    order.items = req.body.items
    order.billing = req.body.billing
    order.save((err,order) => {
        if(err) {
            return res.status(400).json({
                error: err
            })
        }else {
            res.json({
                'message': 'Order has been updated successfully!',
                order
            })
        }
    })
}