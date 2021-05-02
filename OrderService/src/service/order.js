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