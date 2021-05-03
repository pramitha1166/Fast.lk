"use strict";

const Product = require("../model/buyer");

const addBuyer = (productData) => {
  return new Promise(async (resolve, reject) => {
    //validate inputs
    const validate = productValidate(productData);
    if (validate.error !== undefined) {
      reject(validate.error.details[0].message); //reject if there is any validation error
    }

    try {
      const product = new Product(productData);
      const savedData = await product.save();
      resolve(savedData);
    } catch (err) {
      reject(err);
    }
  });
};