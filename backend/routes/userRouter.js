const express = require('express')
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const authController = require('../controllers/authController');

router.post('/register', catchAsync(authController.registerNewUser));

router.post('/login', catchAsync(authController.loginUser));

router.get('/logout', authController.logoutUser);

module.exports = router;