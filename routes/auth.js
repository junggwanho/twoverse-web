const express = require('express');

const { signin} = require('../controllers/auth');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares/middleware');


const router = express.Router();

router.post('/signin',isNotLoggedIn, signin);

// router.post('/login', checkAuthentication, login);

module.exports = router;
