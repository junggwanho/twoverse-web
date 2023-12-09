const path = require('path');
const appDir = path.dirname(require.main.filename);
const studentUser = require('../../models/studentUser');
const processQuizYN = require('../../models/processQuizYN');
const processQuiz = require('../../models/processQuiz');
const studentUserScore = require('../../models/studentUserScore');
const ProcessQuizYN = require('../../models/processQuizYN');

exports.QuizPoint = async (req, res) => {
    try {
        const sendData = {};
        const exStudentUser = await studentUser.findOne({ where: { Id: req.body.userId } });

        if (exStudentUser) {
            const student_user_idx = exStudentUser.idx;
            const quiz_idx = req.body.idx;
            const quizYN = req.body.quizYN;

            const exProcessQuiz = await processQuiz.findOne({ where: { idx: quizYN.idx } })

            const exQuizYN = await processQuizYN.findOne({ where: { student_user_idx, quiz_idx } });

            if (exQuizYN) {
                await processQuizYN.update({
                    quiz_idx,
                    quizYN,
                    process: exProcessQuiz.process,
                }, {
                    where: { student_user_idx, quiz_idx },
                });
                sendData.isSuccess = "update";
            } else {
                await processQuizYN.create({
                    quiz_idx,
                    quizYN,
                    process,
                    student_user_idx,
                });
                sendData.isSuccess = "create";
            }
        } else {
            sendData.isSuccess = "잘못된 값입니다";
        }

        res.send(sendData); // await 사용하지 않음
    } catch (error) {
        console.error('Error in QuizPoint:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
};

exports.testFinish = async (req, res) => {
    try {
        const exStudentUser = await studentUser.findOne({ where: { Id: req.body.userId } });
        const exQuizYN = await ProcessQuizYN.findAll({ where: { process: req.body.process } });
        let score = 0;

        for (let i = 0; i < exQuizYN.length; i++) {
            if (exQuizYN[i]) {
                score += (100 / exQuizYN.length);
            }
        }

        const roundedScore = Math.round(score);

        const updateObject = {};
        updateObject[req.body.processNum] = roundedScore;
        const student_user_idx = exStudentUser.idx;

        await studentUserScore.update(updateObject, { where: { student_user_idx } });
        res.send(true);
    } catch (error) {
        console.error('Error in testFinish:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
};

