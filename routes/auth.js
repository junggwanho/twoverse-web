const express = require('express');
const router = express.Router();

const { signin, login, email} = require('../controllers/auth');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares/middleware');

router.post('/signin', signin);

router.post('/login', login);

router.post('/email', email);

module.exports = router;
