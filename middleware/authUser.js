module.exports = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must sign in to continue');
        return res.redirect('/login');
    } else {
        next();
    }
}