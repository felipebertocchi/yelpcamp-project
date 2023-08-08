const express = require('express')
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const authController = require('../controllers/authController');

router.post('/register', catchAsync(authController.registerNewUser));

router.post('/login',
        function (req, res, next) {
            passport.authenticate('local', function (err, user, info) {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Login failed', error: err });
                }
                if (!user) {
                    return res.status(401).json({ error: info.message });
                }
                req.logIn(user, function (err) {
                    if (err) {
                        return next(err);
                    }
                    next();
                });
            })(req, res, next);
        },
        catchAsync(authController.loginUser)
    );

router.get('/logout', authController.logoutUser);

router.get('/user', authController.getUser)

module.exports = router;