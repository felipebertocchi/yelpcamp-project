const User = require('../models/user');

module.exports = {
    getRegisterForm: (req, res) => {
        res.render('users/register');
    },
    registerNewUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = new User({ email });
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