const express = require('express');
const { products, addProduct , singleProduct, updateProduct, deleteProduct } = require('../controllers/product.controller');
const router = express.Router();

// product route
router.get('/products', products);

// add product
router.post("/add-product", addProduct)

// single product
router.get('/product/:id', singleProduct);

// update product
router.put('/edit/:id', updateProduct);

// delete product
router.delete('/delete/:id', deleteProduct);

module.exports = router;