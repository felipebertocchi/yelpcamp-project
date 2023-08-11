const passport = require('passport');
const jwt = require('jsonwebtoken');

// User model
const User = require('../models/user');

// Strategies
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

// Local strategy with passport mongoose plugin User.authenticate() function
passport.use(new LocalStrategy({ usernameField: 'email' }, User.authenticate()));

// Required for our support for sessions in passport.
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function (jwt_payload) {
    return jwt.sign(jwt_payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// JWT Strategy
exports.jwtPassport = passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
},
    // "done" is the callback provided by passport
    (jwt_payload, done) => {
        // Search the user with jwt.payload userID field
        const user = User.findOne({ _id: jwt_payload.userID })
        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    }));

// Verify an incoming user with jwt strategy we just configured above   
exports.verifyJwt = passport.authenticate('jwt', { session: false });