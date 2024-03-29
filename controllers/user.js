const User = require('../models/user');
const studentUser = require('../models/studentUser');
const Feedback = require('../models/feedback');
const StudentUserScore = require('../models/studentUserScore');
const StudentUserProgress = require('../models/studentUserPorgress');
const Quiz = require('../models/processQuiz');
const QuizYN = require('../models/processQuizYN');

exports.findUserName = async (req, res) => {
    if (req.session && req.session.username) {
        try {
            // 세션에서 사용자 이름 가져오기
            const sessionUsername = req.session.username;
            const sessionUserType= req.session.userType;

            console.log(sessionUsername);
            // 데이터베이스에서 사용자 모델 조회
            // const user = await User.findOne({ where: { sessionUsername } });

            if (sessionUsername) {
                // 사용자 모델에서 이름 가져오기
                const data = {
                    username: sessionUsername,
                    userType: sessionUserType
                }; // 'username' 키를 사용하여 데이터를 보냄
                res.send(data); // 변경: res.send 대신 res.json 사용
            } else {
                res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
            }
        } catch (error) {
            console.error('사용자 정보를 가져오는 중 오류 발생:', error);
            res.status(500).json({ message: '내부 서버 오류' });
        }
    } else {
        res.status(401).json({ message: '인증되지 않았습니다.' });
    }
};

exports.findCheckCode = async (req, res) => {

    try {
        const exUser = await User.findOne({ where: { id: req.session.userId } });
        if (exUser) {
            const data = { checkCode: exUser.check_code };
            console.log(data);
            res.send(data);
        }
    } catch {
        res.status(401).json({ message: '인증되지 않았습니다.' });
    }

};

exports.studentuserList = async (req, res) => {
    try {
        const exUser = await User.findOne({ where: { id: req.session.userId } });
        if (exUser) {
            const checkCode = exUser.check_code;
            const studentUsers = await studentUser.findAll({ where: { check_code: checkCode } });
            const studentList = studentUsers.map(user => ({ name: user.name, id: user.idx }));
            res.json(studentList);
        } else {
            res.status(401).json({ message: '인증되지 않았습니다.' });
        }
    } catch (error) {
        console.error('Error fetching student user list:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
};

exports.findStudentUserFeedback = async (req, res) => {
    try {
        const { studentId } = req.params; // Extract studentId from request parameters
        console.log(studentId);

        const exStudentUserFeedback = await Feedback.findOne({ where: { student_user_idx: studentId } });
        if (exStudentUserFeedback) {
            const data = { feedback: exStudentUserFeedback.feedback }
            res.send(data);
        } else {
            await Feedback.create({
                student_user_idx: studentId,
                feedback: null,
            });
            const data = { feedback: "내용을 입력해주세요" }
            res.send(data);
        }

        // Rest of your code...
    } catch (error) {
        console.error('Error finding student user feedback:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.saveFeedback = async (req, res) => {
    try {
        const exStudentUserFeedback = await Feedback.findOne({ where: { student_user_idx: req.body.studentId } });
        if (exStudentUserFeedback) {
            await Feedback.update(
                { feedback: req.body.feedback },
                { where: { student_user_idx: req.body.studentId } }
            );

            // 성공한 경우 200 OK 상태 코드와 메시지 전송
            res.status(200).json({ message: '피드백이 성공적으로 저장되었습니다.' });
        } else {
            // 인증되지 않은 경우 401 Unauthorized 상태 코드와 메시지 전송
            res.status(401).json({ message: '인증되지 않았습니다.' });
        }
    } catch (error) {
        console.error('Error finding student user feedback:', error);

        // 내부 서버 오류인 경우 500 Internal Server Error 상태 코드와 메시지 전송
        res.status(500).json({ error: '내부 서버 오류' });
    }
}

exports.findStudentUserChart = async (req, res) => {

    const { studentId } = req.params;

    const exstudentUser = await studentUser.findOne({
        where: { idx: studentId },
    });

    try {
        if (exstudentUser) {
            const exStudentUserScores = await StudentUserScore.findOne({
                where: { student_user_idx: studentId },
            });

            if (exStudentUserScores) {
                const processScoreOne = exStudentUserScores.process_score_one;
                const processScoreTwo = exStudentUserScores.process_score_two;
                const processScoreThree = exStudentUserScores.process_score_three;
                const processScoreFour = exStudentUserScores.process_score_four;

                const data = [
                    {
                        name: '1공정',
                        'User Score': processScoreOne,
                        'Average Score': calculateAverage(processScoreOne),
                    },
                    {
                        name: '2공정',
                        'User Score': processScoreTwo,
                        'Average Score': calculateAverage(processScoreTwo),
                    },
                    {
                        name: '3공정',
                        'User Score': processScoreThree,
                        'Average Score': calculateAverage(processScoreThree),
                    },
                    {
                        name: '4공정',
                        'User Score': processScoreFour,
                        'Average Score': calculateAverage(processScoreFour),
                    },
                ];
                console.log(data);

                res.send(data);
            } else {
                res.send();
            }
        } else {
            res.status(404).json({ error: 'Student not found' });
        }
    } catch (error) {
        console.error('Error finding student user scores:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

    function calculateAverage(score) {
        return 88;
    }
}

exports.findStudentUserProgress = async (req, res) => {

    const { studentId } = req.params;

    // Assuming there is a model named StudentUser representing the student_user_idx
    const exstudentUser = await studentUser.findOne({
        where: { idx: studentId },
    });

    try {
        if (exstudentUser) {
            const exStudentUserProgress = await StudentUserProgress.findOne({
                where: { student_user_idx: studentId },
            });

            if (exStudentUserProgress) {
                const progressScoreOne = exStudentUserProgress.progress_one;
                const progressScoreTwo = exStudentUserProgress.progress_two;
                const progressScoreThree = exStudentUserProgress.progress_three;
                const progressScoreFour = exStudentUserProgress.progress_four;

                // Manually create a list with custom names
                const data = {
                    stepOne: progressScoreOne,
                    stepTwo: progressScoreTwo,
                    stepThree: progressScoreThree,
                    stepFour: progressScoreFour,
                };;
                console.log(data);
                res.send(data);
            } else {
                res.send();
            }
        } else {
            // If no student is found with the given studentId
            res.status(404).json({ error: 'Student not found' });
        }
    } catch (error) {
        console.error('Error finding student user scores:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.findStudentUserQuiz = async (req, res) => {
    try {
        const exQuiz = await Quiz.findAll();

        const quizList = exQuiz.map(quizItem => ({ idx: quizItem.idx, process: quizItem.process, quiz: quizItem.quiz, quizYN: quizItem.quizYN }));
        console.log(quizList);
        res.json(quizList);
    } catch (error) {
        console.error('Error fetching student user list:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
}

exports.findStudentUserQuizYN = async (req, res) => {
    const { studentId } = req.params;
    try {
        const exQuizYN = await QuizYN.findAll({ where: { student_user_idx: studentId } });
        const quizYNList = exQuizYN.map(quizYNItem => ({ idx: quizYNItem.quiz_idx, quizYN: quizYNItem.quizYN }));
        res.json(quizYNList);
    } catch (error) {
        console.error('Error fetching student user list:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
}



