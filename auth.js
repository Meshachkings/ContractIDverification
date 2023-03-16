const  passport         = require('passport'),
       LocalStrategy    = require('passport-local'),
       User             = require('./models/users');


// use static authenticate method of model in LocalStrategy
exports.local = passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());