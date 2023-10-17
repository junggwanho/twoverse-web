const express = require('express');

const { signin } = require('../controllers/auth');
const { checkAuthentication } = require('../middlewares/middleware');


const router = express.Router();

router.post('/signin', checkAuthentication, signin);

module.exports = router;
