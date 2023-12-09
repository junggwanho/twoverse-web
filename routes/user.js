const express = require('express');
const router = express.Router();

const { findUserName, findCheckCode, studentuserList, findStudentUserFeedback, saveFeedback, findStudentUserChart, findStudentUserProgress, findStudentUserQuiz, findStudentUserQuizYN } = require('../controllers/user');
const {studentuserIdx} = require('../controllers/studentUser');

router.get('/studentUserIdx', studentuserIdx);

router.get('/findUserName', findUserName);

router.get('/findCheckCode', findCheckCode);

router.get('/studentuserList', studentuserList);

router.get('/studentuserFeedback/:studentId', findStudentUserFeedback);

router.post('/savefeedback', saveFeedback);

router.get('/chart/:studentId', findStudentUserChart );

router.get('/progress/:studentId', findStudentUserProgress );

router.get('/quiz/:mainSelectedStudentId', findStudentUserQuiz );

router.get('/quizYN/:studentId', findStudentUserQuizYN);



module.exports = router;