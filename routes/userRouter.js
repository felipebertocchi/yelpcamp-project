const express = require('express')
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');
const authController = require('../controllers/authController');

router.route('/register')
    .get(authController.getRegisterForm)
    .post(catchAsync(authController.registerNewUser));

router.route('/login')
    .get(authController.getLoginForm)
    .post(
        storeReturnTo,
        passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),
        catchAsync(authController.loginUser)
    );

router.get('/logout', authController.logoutUser);

module.exports = router;