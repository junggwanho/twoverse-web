const bcrypt = require('bcrypt');
const path = require('path');
var appDir = path.dirname(require.main.filename);

exports.login = async (req, res, next) => {
    const id = req.body.userId;
    const password = req.body.userPassword;

    const sendData = { isSuccess: "" };

    try {
        const exUser = await User.findOne({ where: { id } });
        if (!exUser) {
            sendData.isSuccess = "사용자를 찾을 수 없습니다";
            res.send(sendData);
        } else {
            const isPasswordValid = await bcrypt.compare(password, exUser.password);
            if (isPasswordValid) {
                console.log('로그인 성공');
                sendData.isLogin = "True";

                // Save user information in the session
                req.session.isLogined = true;
                req.session.userId = exUser.id; // assuming your User model has an 'id' property
                req.session.username = exUser.username;

                res.send(sendData);
            } else {
                sendData.isLogin = "비밀번호가 일치하지 않습니다";
                res.send(sendData);
            }
        }
    } catch (error) {
        console.error(error);
        return next(error);
    }
}