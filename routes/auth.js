const express = require('express');

const { signin, login } = require('../controllers/auth');
const { checkAuthentication } = require('../middlewares/middleware');


const router = express.Router();

router.post('/signin', checkAuthentication, signin);

router.post('/login', checkAuthentication, login);

module.exports = router;
