const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const { sequelize } = require('./models');
const passportConfig = require('./passport');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const unityRouter = require('./routes/unity/unity');

dotenv.config(); // .env 파일을 사용하기 위한 설정

const app = express();

app.use(cors({
    origin: '*', // 모든 출처 허용 옵션. true 를 써도 된다.
}));

passportConfig(); // 패스포트 설정
app.set('port', process.env.PORT || 3001);

sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'build'))); // React 빌드 폴더 경로 설정

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
app.use(passport.initialize());
app.use(passport.session());


// '/' 루트 경로에 대한 요청 처리 (React 앱 진입점 페이지)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.use('/authcheck', (req, res) => {
    const sendData = { isLogin: "" };
    if (req.session.is_logined) {
        sendData.isLogin = "True"
    } else {
        sendData.isLogin = "False"
    }
    res.send(sendData);
})

// '/auth' 경로를 사용하는 라우터 추가
app.use('/auth', authRouter);

app.use('/user', userRouter);

app.use('/unity', unityRouter);

// 404 에러 핸들링 미들웨어
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.send('에러 페이지 또는 JSON 응답을 반환하세요.'); // 템플릿 엔진 사용 시 수정 필요
});

app.listen(app.get('port'), () => {
    console.log(`Example app listening at http://localhost:${app.get('port')}`);
});
