"use strict";

const productValidate = require("./../util/productValidation");
const Product = require("./../model/product");
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

/**
 * Current implementation for view all products from the mongodb database
 * uses mongoose @visit {https://www.npmjs.com/package/mongoose} for object mappping
 *
 * @params {object query - that contains page number and item limit for pagination}
 * @return {promise} {resolve all products with pagination or reject if there is any error}
 */
const getProducts = (query) => {
  //extract url params for control pagination
  const page = query.page;
  const limit = query.limit;

  return new Promise(async (resolve, reject) => {
    try {
      const allProducts = await Product.find(); //get all products
      resolve(paginationControl(allProducts, page, limit));
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Current implementation for view all products of a specific seller from the mongodb database
 * uses mongoose @visit {https://www.npmjs.com/package/mongoose} for object mappping
 *
 * @params {integer sellerId}
 * @params {object query - that contains page number and item limit for pagination}
 * @return {promise} {resolve allproducts of a specific seller with pagination or reject if there is any error}
 */
const getSellerProducts = (sellerId, query) => {
  //extract url params for control pagination
  const page = query.page;
  const limit = query.limit;

  return new Promise(async (resolve, reject) => {
    try {
      const allSellerProducts = await Product.find({ ownerRef: sellerId }); //get products for a specific seller
      resolve(paginationControl(allSellerProducts, page, limit));
    } catch (err) {
      reject(err);
    }
  });
};

module.exports.addProduct = addProduct;
module.exports.getProducts = getProducts;
module.exports.getSellerProducts = getSellerProducts;
