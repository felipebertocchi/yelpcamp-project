const User = require('../models/user');

module.exports = {
    getRegisterForm: (req, res) => {
        res.render('users/register');
    },
    registerNewUser: async (req, res) => {
        try {
            const { name, email, phone, password } = req.body;
            const user = new User({ name, email, phone });
            const registedUser = await User.register(user, password);
            req.login(registedUser, function (err) {
                if (err) { return next(err); }
                return res.status(200).json({ message: 'User registered successfully' });
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Error registering user', error: err.message });
        }
    },
    getLoginForm: (req, res) => {
        res.render('users/login');
    },
    loginUser: async (req, res) => {
        if (req.isAuthenticated()) {
            return res.status(200).json({
                verified: true,
                user: req.user
            });
        } else {
            return res.status(500).json({ message: 'There was an error processing the login request' });
        }
    },
    logoutUser: (req, res, next) => {
        req.logout(function (err) {
            if (err) { return next(err); }
            res.redirect('/campgrounds');
        });
    },
    getUser: (req, res, next) => {
        if (req.isAuthenticated()) {
            return res.status(200).json({
                verified: true,
                user: req.user
            });
        } else {
            return res.status(200).json({
                message: "User is not authenticated"
            });
        }
    }
}