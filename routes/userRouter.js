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
        await User.register(user, password);
        req.flash('success', `Welcome to Yelp Camp, ${username}!`)
        res.redirect('/campgrounds')
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

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/campgrounds');
});

module.exports = router;