module.exports = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        return res.status(400).json({ message: 'You must log in to continue', sessionExpired: true})
    } else {
        next();
    }
}