const express = require('express');
const router = express.Router();

const { login } = require('../../controllers/unity/login');
const { OBJexplain, OBJquiz } = require('../../controllers/unity/process');

router.post('/login', login);

router.get('/OBJexplain', OBJexplain);

router.get('/OBJquiz', OBJquiz);

module.exports = router;

