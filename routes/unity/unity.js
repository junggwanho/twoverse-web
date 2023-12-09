const express = require('express');
const router = express.Router();

const { login } = require('../../controllers/unity/login');
const { OBJexplain, OBJquiz } = require('../../controllers/unity/process');
const {QuizPoint, testFinish} = require('../../controllers/unity/quiz');
const {updateProgress} = require('../../controllers/unity/progress');

router.post('/login', login);

router.get('/OBJexplain', OBJexplain);

router.get('/OBJquiz', OBJquiz);

router.post('/QuizPoint',QuizPoint);

router.post('/progress',updateProgress);

router.get('/testFinish', testFinish)

module.exports = router;

