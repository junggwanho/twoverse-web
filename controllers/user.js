const express = require('express');
const session = require('express-session');
const router = express.Router();
const User = require('../models/user'); // 경로는 실제 프로젝트에 맞게 조정하세요

// Example route to retrieve user details based on the session's username
exports.findUserName = async (req, res) => {
    if (req.session && req.session.username) {
        try {
            console.log('시작');
            const data = {username:""};
            data.username = req.session.username;
            res.send(data);
        } catch (error) {
            console.error('사용자 정보를 가져오는 중 오류 발생:', error);
            res.status(500).json({ message: '내부 서버 오류' });
        }
    } else {
        res.status(401).json({ message: '인증되지 않았습니다.' });
    }
};

