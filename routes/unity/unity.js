const express = require('express');
const router = express.Router();

const { login } = require('../../controllers/unity/login');
const { OBJexplain } = require('../../controllers/unity/process');

router.post('/login', login);

router.get('/OBJexplain', OBJexplain);

module.exports = router;

