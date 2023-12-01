const express = require('express');
const router = express.Router();

const { findUserName, findCheckCode, studentuserList } = require('../controllers/user');

router.get('/findUserName', findUserName);

router.get('/findCheckCode', findCheckCode);

router.get('/studentuserList', studentuserList);

module.exports = router;