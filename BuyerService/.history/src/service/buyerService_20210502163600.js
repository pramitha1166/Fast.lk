"use strict";

const Product = require("../model/product");
const { paginationControl } = require("./../util/paginationControl");

/**
 * Current implementation for add product to mopngodb using mongoose
 * uses mongoose @visit {https://www.npmjs.com/package/mongoose} for object mappping
 *
 * @params {An instance of product model}
 * @return {promise} {resolve upon successfull product add or reject if there is any error}
 */
const addProduct = (productData) => {
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