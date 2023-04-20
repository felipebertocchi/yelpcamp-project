const express = require('express')
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');

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
        res.redirect('/users/register')
    }
}));

module.exports = router;