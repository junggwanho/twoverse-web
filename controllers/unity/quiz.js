const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const appDir = path.dirname(require.main.filename);
const studentUser = require('../../models/studentUser');
const processQuizYN = require('../../models/processQuizYN');


exports.QuizPoint = async (req, res) => {
    try {
        const exStudentUser = await studentUser.findAll({ where: { process: req.body.userId } });
        const studentUserIdx = exStudentUser.idx;
        const quizIdx = req.body.idx;
        const quizYN = req.body.quizYN;
        if (exStudentUser) {
            await processQuizYN.create({
                quizIdx,
                quizYN,
                studentUserIdx,
            });
        } else {
            sendData.isSuccess = "잘못된값입니다"
            await res.send(sendData);
        }
    } catch (error) {
        console.error('Error fetching student user list:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
}