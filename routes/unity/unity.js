const express = require('express');
const router = express.Router();

const { login } = require('../../controllers/unity/login');

router.post('/login', login);

module.exports = router;

