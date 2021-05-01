"use strict";

const productValidate = require("./../util/productValidation");
const Product = require("./../model/product");

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
 * @params {nonel}
 * @return {promise} {resolve all products or reject if there is any error}
 */
const getProducts = () => {
  return new Promise( async (resolve, reject) => {
      try{
        const allProducts = await Product.find();
        resolve(allProducts);
      }catch(err){
        reject(err);
      }
  });
};


/**
 * Current implementation for view all products of a specific seller from the mongodb database
 * uses mongoose @visit {https://www.npmjs.com/package/mongoose} for object mappping
 *
 * @params {integer sellerId}
 * @return {promise} {resolve allproducts of a specific seller or reject if there is any error}
 */
const getSellerProducts = (sellerId) => {
    return new Promise( async (resolve, reject) => {
        try{
          const allSellerProducts = await Product.find({ownerRef: sellerId});
          resolve(allSellerProducts);
        }catch(err){
          reject(err);
        }
    });
  };

module.exports.addProduct = addProduct;
module.exports.getProducts = getProducts;
module.exports.getSellerProducts = getSellerProducts;
