'use strict'

const Order = require('../model/order')

exports.createOrderService = (order_item) => {
    return new Promise((resolve,reject) => {
        const order = new Order(order_item)
           
        order.save((err,order) => {
            if(err) {
                reject(err) 
            }else {
                resolve(order)
            }
        })
       
    })
}

exports.getOrderByIdService = (id) => {
    return new Promise((resolve,reject) => {
        Order.findById(id).exec((err,order) => {
            if(err) {
                reject(err)
            }else {
                resolve(order)
            }
        })
    })
}

exports.deleteOrderService = (order) => {
    return new Promise((resolve,reject) => {
        order.remove((err,order) => {
            if(err) {
                reject(err)
            }else {
                resolve(order)
            }
        })
    })
}

exports.updateOrderService = (order,body) => {
    return new Promise((resolve,reject) => {
        order.customer = body.customer
        order.amount = body.amount
        order.items = body.items
        order.billing = body.billing
        order.save((err,order) => {
            if(err) {
                reject(err)
            }else {
                resolve(order)
            }
        })
    })
}

exports.getAllOrdersService = (query) => {
    return new Promise((resolve,reject) => {
        let sortBy = query.sortBy ? query.sortBy: '_id'
        let orderBy = query.orderBy ? query.orderBy: 'asc'  
        let limit = query.limit ? query.limit : 10

        Order.find()
        .limit(limit)
        .exec((err,order) => {
            if(err) {
                reject(err)
            }else {
                resolve(order)
            }
        })

    })
}