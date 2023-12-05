const express = require('express');
const router = express.Router();

const { findUserName, findCheckCode, studentuserList, findStudentUserFeedback, saveFeedback, findStudentUserChart } = require('../controllers/user');

router.get('/findUserName', findUserName);

router.get('/findCheckCode', findCheckCode);

router.get('/studentuserList', studentuserList);

router.get('/studentuserFeedback/:studentId', findStudentUserFeedback);

router.post('/savefeedback', saveFeedback);

router.get('/chart/:studentId', findStudentUserChart )

module.exports = router;