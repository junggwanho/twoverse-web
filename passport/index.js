const passport = require('passport');
const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => {
        console.log('serialize');
        done(null, user.id);
    });
}