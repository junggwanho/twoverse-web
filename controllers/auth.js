const bcrypt = require('bcrypt');
const passport = require('passport');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
var appDir = path.dirname(require.main.filename);

const User = require('../models/user')

exports.signin = async (req, res, next) => {  // 데이터 받아서 결과 전송
    
    const generateRandomKey = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomKey = '';
      
        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          randomKey += characters.charAt(randomIndex);
        }
      
        return randomKey;
      };

    const id = req.body.userId;
    const name = req.body.userName;
    const password = req.body.userPassword;
    const email = req.body.userEmail;
    const check_code = generateRandomKey();

    const sendData = { isSuccess: "" };

    try {
        const exUser = await User.findOne({ where: { id } });
        if (!exUser) {
            const hash = await bcrypt.hash(password, 12);
            await User.create({
                id,
                name,
                password: hash,
                email,
                check_code,
            });
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

exports.email = async (req, res) => {
    const sendData = {
        emailCheck: "",
        userCheck: ""
    };

    try {
        let authNum = Math.random().toString().substring(2, 6);
        let emailTemplate;
        ejs.renderFile(appDir + '/template/authMail.ejs', { authCode: authNum }, function (err, data) {
            if (err) {
                console.log(err);
            }
            emailTemplate = data;
        });

        let transporter = nodemailer.createTransport({
            service: 'naver',
            host: 'smtp.naver.com',
            port: 587,
            secure: false,
            auth: {
                user: 'rhksgh1222@naver.com',
                pass: process.env.NODEMAILER_PASS,
            },
        });

        let mailOptions = await transporter.sendMail({
            from: '"정관호" <rhksgh1222@naver.com>',
            to: req.body.userEmail,
            subject: '회원가입을 위한 인증번호를 입력해주세요.',
            html: emailTemplate,
        });

        transporter.sendMail(mailOptions, function () {
            sendData.emailCheckNum = authNum;
            sendData.emailCheck = "True";
            res.send(sendData);
            transporter.close();
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('서버 오류');
    }
};

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


                req.session.isLogined = true;
                req.session.userId = exUser.id; // assuming your User model has an 'id' property
                req.session.username = exUser.name;
                req.session.userType = "teacher";

                console.log(req.session);
                
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



