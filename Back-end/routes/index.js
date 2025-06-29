const express = require('express');
const router = express.Router();
const userRoute = require('./user');
const productRoute = require('./product');
const cartRoute = require('./cart');

// Route for user-related operations
// This will handle user registration, login, and other user-related functionalities
router.use('/user',userRoute)

// Route for product-related operations
// This will handle product listing, adding, updating, and deleting products
router.use('/userProduct', productRoute);

router.use('/singleProduct', productRoute);

router.use('/updateProduct', productRoute);

router.use('/deleteProduct', productRoute);

router.use('/cart', cartRoute)

module.exports = router;