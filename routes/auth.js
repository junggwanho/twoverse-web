const express = require('express');
const router = express.Router();

const { signin, login, email, logout} = require('../controllers/auth');
const { studentSignin, studentLogin} = require('../controllers/studentAuth');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares/middleware');

router.post('/signin', signin);

router.post('/login', login);

router.post('/email', email);

router.get('/logout', logout);

router.post('/student/signin', studentSignin);

router.post('/student/login', studentLogin);

module.exports = router;
