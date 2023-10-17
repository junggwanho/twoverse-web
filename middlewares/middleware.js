function checkAuthentication(req, res, next) {
    if (req.session && req.session.is_logined) {
        // 사용자가 인증되었을 때 실행할 작업
        next(); // 다음 미들웨어 또는 라우터로 이동
    } else {
        res.status(401).send('인증되지 않았습니다.'); // 인증되지 않은 경우
    }
}

module.exports = { checkAuthentication };