const express = require('express');
const router = express.Router();
// const jwt = require('jsonwebtoken');
const { cart , addToCart, updateCart, payment } = require('../controllers/cart.controller');

// route to get user cart
router.get('/userCart', cart); 

// route to add product to cart
router.post('/addCart', addToCart )

router.put('/updateCart', updateCart )

router.post('/payment',payment)

module.exports = router;
