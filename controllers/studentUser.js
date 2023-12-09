const studentUser = require('../models/studentUser');

exports.studentuserIdx = async (req, res) => {
    try {
        const exStudentUser = await studentUser.findOne({ where: { id: req.session.userId } });
        if (exStudentUser) {
            const studentIdx = { idx : exStudentUser.idx};
            res.json(studentIdx);
        } else {
            res.status(401).json({ message: '존재하지않은 학생입니다.' });
        }
    } catch (error) {
        console.error('Error fetching student user list:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
};