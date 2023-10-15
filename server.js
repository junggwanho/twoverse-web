const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('./session'); // session.js에서 미들웨어 가져오기
const authRoutes = require('./routes/auth');

const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, '/build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session); // session.js에서 가져온 미들웨어 추가

app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`앱이 http://localhost:${port}에서 실행 중입니다.`);
});
