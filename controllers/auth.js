const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.join = async (req, res, next) => {
    const { id, nick, password, phonenumber } = req.body;
    try {
        const exUser = await User.findOne({ where: { id } });
        if (exUser) {
            return res.redirect('/join?error=exixt');
        }
        const hash = await bcrypt.hash(password, 16);
        await User.create({
            id,
            nick,
            password: hash,
            phonenumber,
        });
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return next(error);
    }
}

exports.login = (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.redirect(`/?error=${info.message}`);
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req, res, next);
}

exports.logout = (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
};