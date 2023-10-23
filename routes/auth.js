const express = require('express');

const { signin, login} = require('../controllers/auth');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares/middleware');


const router = express.Router();

router.post('/signin', signin);

router.post('/login', login);

module.exports = router;
