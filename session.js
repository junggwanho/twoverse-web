const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const sessionOption = require('./lib/sessionOption');

const sessionStore = new MySQLStore(sessionOption);

const sessionMiddleware = session({
    key: 'session_cookie_name',
    secret: '~',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
});

module.exports = sessionMiddleware;
