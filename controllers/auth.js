const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user')

exports.signin = async (req, res, next) => {  // 데이터 받아서 결과 전송
    const username = req.body.userId;
    const password = req.body.userPassword;
    const password2 = req.body.userPassword2;

    const sendData = { isSuccess: "" };

    try {
        if(password === password2){
            sendData.isSuccess = "비밀번호를 다시 확인해 주세요"
            res.send(sendData);
        }
        const exUser = await User.findOne({ where: { username } });
        if (!exUser) {
            const hash = await bcrypt.hash(password, 12);
            await User.create({
                username,
                password: hash,
            });
            sendData.isSuccess = "True"
            res.send(sendData);
        } else {
            sendData.isSuccess = "중복된아이디 입니다"
            res.send(sendData);
        }
    } catch (error) {
        console.error(error);
        return next(error);
    }
}

exports.login = async (req, res, next) => {
    const username = req.body.userId;
    const password = req.body.userPassword;

    const sendData = { isSuccess: "" };

    try {
        const exUser = await User.findOne({ where: { username } });
        if (!exUser) {
            sendData.isSuccess = "사용자를 찾을 수 없습니다";
            res.send(sendData);
        } else {
            const isPasswordValid = await bcrypt.compare(password, exUser.password);
            if (isPasswordValid) {
                console.log('로그인 성공');
                sendData.isSuccess = "True";
                res.send(sendData);
            } else {
                sendData.isSuccess = "비밀번호가 일치하지 않습니다";
                res.send(sendData);
            }
        }
    } catch (error) {
        console.error(error);
        return next(error);
    }
}