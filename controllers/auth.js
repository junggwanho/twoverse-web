const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');

exports.signin = async (req, res, next) => {
    const { id, nick, passord, password2, phonenumber } = req.body;
    try {
        const UserId = await User.findOne({ where: { id } });
        const UserPhoneNumber = await User.findOne({ where: {phonenumber}});
        if (UserId) {
            sendData.isSuccess = "이미 존재하는 아이디입니다"
            res.send(sendData);
        }
    }
}