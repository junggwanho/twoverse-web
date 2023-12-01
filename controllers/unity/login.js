const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const appDir = path.dirname(require.main.filename);
const User = require('../../models/user');

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

                // 토큰 생성
                const token = jwt.sign({ userId: exUser.id }, 'COOKIE_SECRET', { expiresIn: '1h' });

                // 세션에 사용자 정보 및 토큰 저장
                req.session.isLogined = true;
                req.session.userId = exUser.id;
                req.session.username = exUser.name;
                req.session.token = token;

                // 토큰을 Unity에 전송
                res.json({ ...sendData, token });
            } else {
                sendData.isLogin = "비밀번호가 일치하지 않습니다";
                res.send(sendData);
            }
        }
    } catch (error) {
        console.error(error);
        return next(error);
    }
};