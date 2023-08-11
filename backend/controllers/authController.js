const passport = require('passport');
const User = require('../models/user');
const { getToken } = require('../auth');

module.exports = {
    registerNewUser: async (req, res) => {
        const { name, email, phone, password } = req.body;
        try {
            User.register(
                new User({ name, email, phone }),
                password,
                function (err, user, info) {
                    if (err) {
                        res.setHeader('Content-Type', 'application/json');
                        res.status(500).json({ message: 'There was an error with the user registration', err, info });
                    }
                    else {
                        passport.authenticate('local')(req, res, () => {
                            const token = getToken({ userID: user._id, name: user.name });
                            res.setHeader('Content-Type', 'application/json');
                            res.status(200).json({ verified: true, status: 'Registration Successful', token });
                        });
                    }
                }
            );
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Error registering user', error: err.message });
        }
    },
    loginUser: async (req, res) => {
        passport.authenticate("local", function (err, user, info) {
            if (err) {
                return res.status(500).json({ message: 'There was an error processing the login request', err });
            }
            if (!user) {
                return res.status(500).json({ message: 'email or password is wrong', info });
            }
            const token = getToken({ userID: user._id, name: user.name });
            return res.status(200).json({ verified: true, message: "Login successful", token });
        })(req, res)
    },
    logoutUser: (req, res) => {
        req.logout(function (err) {
            if (err) return res.status(500).json({ message: 'User logout failed', error: err });
            return res.status(200).json({ message: 'See you later!' });
        });
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