const express = require('express');
const { signup } = require('../controllers/user.controller');
const { login } = require('../controllers/user.controller');
const router = express.Router();


// signup route
router.post('/register', signup)

// login route
router.post('/login', login)

router.get('/verify', userController.verifyEmail);

module.exports = router;