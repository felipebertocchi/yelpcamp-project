const User = require('../models/user');

module.exports = {
    getRegisterForm: (req, res) => {
        res.render('users/register');
    },
    registerNewUser: async (req, res) => {
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
    },
    getLoginForm: (req, res) => {
        res.render('users/login');
    },
    loginUser: async (req, res) => {
        const { username } = req.body;
        req.flash('success', `Welcome back ${username}!`);
        const redirectUrl = res.locals.returnTo || '/campgrounds';
        delete req.session.returnTo;
        res.redirect(redirectUrl);
    },
    logoutUser: (req, res, next) => {
        req.logout(function (err) {
            if (err) { return next(err); }
            res.redirect('/campgrounds');
        });
    }
}