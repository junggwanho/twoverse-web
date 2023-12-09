const bcrypt = require('bcrypt');
const path = require('path');
const appDir = path.dirname(require.main.filename);
const studentUser = require('../../models/studentUser');
const progress = require('../../models/studentUserPorgress');

exports.updateProgress = async (req, res) => {
    try {
        const exStudentUser = await studentUser.findOne({ where: { Id: req.body.userId } });
        if (exStudentUser) {
            const userIdx = exStudentUser.idx;

            // Dynamically create the update object
            const updateObject = {};
            updateObject[req.body.process] = req.body.progress;
            await progress.update(
                updateObject,
                { where: { student_user_idx: userIdx } }
            );
            res.send(true);
        } else {
            res.status(401).json({ message: '존재하지않는 유저입니다.' });
        }
    } catch (error) {
        console.error('Error fetching student user list:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
}
