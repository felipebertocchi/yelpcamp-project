const passport = require('passport');
const User = require('../models/user');
const { getToken } = require('../auth');

module.exports = {
    registerNewUser: async (req, res) => {
        const { name, email, password } = req.body;
        try {
            User.register(
                new User({ name, email }),
                password,
                function (err, user, info) {
                    if (err) {
                        res.setHeader('Content-Type', 'application/json');
                        res.status(500).json({ notif: { msg: 'There was an error with the user registration' }, error: err, info });
                    }
                    else {
                        passport.authenticate('local')(req, res, () => {
                            const token = getToken({ userID: user._id, name: user.name });
                            res.setHeader('Content-Type', 'application/json');
                            res.status(200).json({
                                verified: true,
                                notif: { title: "Sign up successful", msg: "Welcome to YelpCamp!" },
                                token
                            });
                        });
                    }
                }
            );
        } catch (err) {
            console.log(err);
            return res.status(500).json({ notif: { title: 'Error registering user', msg: err.message }, error: err });
        }
    },
    loginUser: async (req, res) => {
        passport.authenticate("local", function (err, user, info) {
            if (err) {
                return res.status(500).json({ notif: { msg: 'There was an error processing the login request' }, error: err });
            }
            if (!user) {
                return res.status(500).json({ notif: { msg: 'Email or password is wrong' }, info });
            }
            const token = getToken({ userID: user._id, name: user.name, email: user.email });
            return res.status(200).json({
                verified: true,
                notif: { title: "Login successful", msg: "Welcome back!" },
                token
            });
        })(req, res)
    },
    logoutUser: (req, res) => {
        try {
            return res.status(200).json({ notif: { title: "Logout successful", msg: "See you later!" } });
        } catch (error) {
            return res.status(500).json({ notif: { msg: 'User logout failed', msg: error.message }, error });
        }
    },
    getUser: (req, res) => {
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