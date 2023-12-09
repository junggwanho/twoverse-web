const bcrypt = require('bcrypt');
const passport = require('passport');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
var appDir = path.dirname(require.main.filename);

const studentUserScore = require('../models/studentUserScore');
const User = require('../models/user');
const studentUser = require('../models/studentUser');
const StudentUserProgress = require('../models/studentUserPorgress');

exports.studentSignin = async (req, res, next) => {  // 데이터 받아서 결과 전송

    const id = req.body.userId;
    const name = req.body.userName;
    const password = req.body.userPassword;
    const check_code = req.body.userCheckCode;

    // console.log(checkCode);

    const sendData = { isSuccess: "" };

    try {
        const exUser = await User.findOne( {where: {check_code} });
        if (exUser){
            sendData.isSuccess = "존재하지 않은 선생의 인증키 입니다"
        }
        const StUser = await studentUser.findOne({ where: { id } });
        if (!StUser) {
            const hash = await bcrypt.hash(password, 12);
            await studentUser.create({
                id,
                name,
                password: hash,
                check_code,
            });
            const exStUser = await studentUser.findOne({ where: { id } });
            await StudentUserProgress.create({
                progress_one: 0,
                progress_two: 0,
                progress_three: 0,
                progress_four: 0,
                student_user_idx: exStUser.idx,
            });
            await studentUserScore.create({
                process_score_one: 0,
                process_score_two: 0,
                process_score_three: 0,
                process_score_four: 0,
                student_user_idx: exStUser.idx,
            })
            sendData.isSuccess = "True"
            await res.send(sendData);
        } else {
            sendData.isSuccess = "중복된아이디 입니다"
            await res.send(sendData);
        }
    } catch (error) {
        console.error(error);
        return next(error);
    }
}

exports.studentLogin = async (req, res, next) => {
    const id = req.body.userId;
    const password = req.body.userPassword;

    const sendData = { isSuccess: "" };

    try {
        const exUser = await studentUser.findOne({ where: { id } });
        if (!exUser) {
            sendData.isSuccess = "사용자를 찾을 수 없습니다";
            res.send(sendData);
        } else {
            const isPasswordValid = await bcrypt.compare(password, exUser.password);
            if (isPasswordValid) {
                console.log('로그인 성공');
                sendData.isLogin = "True";


                req.session.isLogined = true;
                req.session.userId = exUser.id; // assuming your User model has an 'id' property
                req.session.username = exUser.name;
                req.session.userType = "student";
                
                if(!req.session.isLogined){
                    console.log("세션실종사건")
                }
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

exports.logout = async function(req, res) {
    console.log('값을 받음');
    req.session.destroy(function(err) {
        if (err) {
            console.error('세션 파기 중 오류 발생:', err);
            res.status(500).send('서버 오류');
        } else {
            console.log("파기할께");
            res.redirect('/');
        }
    });
};



