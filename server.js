const express = require('express')
const cookieParser = rquire('cookie-parser');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv')
const session = require('express-session')
const path = require('path');
const authRouter = require('./routes/auth');
const {sequelize} = require('./models')
const passportConfig = require('./passport');
const bcrypt = require('bcrypt');

const app = express();
const port = 3001
dotenv.config();

app.use(express.static(path.join(__dirname, '/build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var MySQLStore = require('express-mysql-session')(session);
var sessionStore = new MySQLStore(sessionOption);
app.use(session({
    key: 'session_cookie_name',
    secret: '~',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}))

app.get('/', (req, res) => {
    req.sendFile(path.join(__dirname, '/build/index.html'));
})

app.get('/authcheck', (req, res) => {
    const sendData = { isLogin: "" };
    if (req.session.is_logined) {
        sendData.isLogin = "True"
    } else {
        sendData.isLogin = "False"
    }
    res.send(sendData);
})




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})