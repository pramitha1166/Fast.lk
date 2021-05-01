const express = require("express");
const router = express.Router();
const { addProduct, getProducts, getSellerProducts } = require("./../service/ProductService");

/**
 * This function is only for accepting /api/product/add requests for adding products
 * The request body must contain all the attributes of model product
 * see model product @path {src/model/product.js}
 * This function can use any method implementation inside the service layer for adding products-
 * -to any given relational or none relational database 
 * see productService @path {src/service/productService.js}
 *
 * @method { HTTP POST }
 * @url {/api/product/add}
 * @urlparams {none}
 * @return {json} {result given by the addProduct(...) method implementation in the service layer || or any errors}
 */
router.post("/add", async (req, res) => {
  try {
    const result = await addProduct(req.body);
    res.status(201).json({ result });
  } catch (err) {
    res.status(400).json(err);
  }
});


/**
 * This function is only for accepting /api/product/view requests for view all products
 * The request should not contain any body
 * This function can use any method implementation inside the service layer for view products 
 * see productService @path {src/service/productService.js}
 *
 * @method { HTTP GET }
 * @url {/api/product/view}
 * @urlparams {none}
 * @return {json} {result given by the getProducts() method implementation in the service layer || or any errors}
 */
router.get("/view", async (req, res) => {
  try {
    const result = await getProducts();
    res.status(200).json({ result });
  } catch (err) {
    res.status(400).json(err);
  }
});


/**
 * This function is only for accepting /api/product/view/sellerid requests for view products-
 * -of a specific seller
 * The request should not contain any body
 * This function can use any method implementation inside the service layer for view products-
 * -of a specific seller 
 * see productService @path {src/service/productService.js}
 *
 * @method { HTTP GET }
 * @url {/api/product/view/:sellerid}
 * @urlparams {integer sellerid}
 * @return {json} {result given by the getSellerProducts(...) method implementation in the- 
 * -service layer || or any errors}
 */
router.get("/view/:sellerid", async (req, res) => {
    try{
        const result = await getSellerProducts(req.params.sellerid);
        res.status(200).json({ result });
    }catch(err){
        res.status(400).json(err);
    }
});

module.exports = router;
