const express = require('express')
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');
const authController = require('../controllers/authController');

router.get('/register', authController.getRegisterForm);
router.post('/register', catchAsync(authController.registerNewUser));
router.get('/login', authController.getLoginForm);
router.post('/login',
    storeReturnTo,
    passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),
    catchAsync(authController.loginUser)
);
router.get('/logout', authController.logoutUser);

module.exports = router;