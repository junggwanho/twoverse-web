const User = require('../models/user');
const studentUser = require('../models/studentUser')

exports.findUserName = async (req, res) => {
    if (req.session && req.session.username) {
        try {
            // 세션에서 사용자 이름 가져오기
            const sessionUsername = req.session.username;

            console.log(sessionUsername);
            // 데이터베이스에서 사용자 모델 조회
            // const user = await User.findOne({ where: { sessionUsername } });

            if (sessionUsername) {
                // 사용자 모델에서 이름 가져오기
                const data = { username: sessionUsername }; // 'username' 키를 사용하여 데이터를 보냄
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
    console.log('1');
    try {
        const exUser = await User.findOne({ where: { id: req.session.userId } });
        console.log('1');
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

