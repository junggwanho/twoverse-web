const express = require('express');
const router = express.Router();

const { findUserName } = require('../controllers/user');

router.post('/findUserName', findUserName);

module.exports = router;