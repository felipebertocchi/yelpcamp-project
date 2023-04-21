const express = require('express')
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', catchAsync(async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ email, username });
        const registedUser = await User.register(user, password);
        req.login(registedUser, function (err) {
            if (err) { return next(err); }
            req.flash('success', `Welcome to Yelp Camp, ${username}!`)
            return res.redirect('/campgrounds')
        });
    } catch (error) {
        req.flash('error', error.message)
        res.redirect('/register')
    }
}));

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), catchAsync(async (req, res) => {
    const { username } = req.body;
    req.flash('success', `Welcome back ${username}!`);
    res.redirect('/campgrounds');
}));

router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/campgrounds');
    });
});

module.exports = router;