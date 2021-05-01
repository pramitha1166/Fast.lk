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