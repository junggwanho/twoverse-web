const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const appDir = path.dirname(require.main.filename);
const processExplain = require('../../models/processExplain');

exports.OBJexplain = async (req, res) => {
    try {
        const processData = await processExplain.findAll({ where: { process: req.body.process } });
        if (processData) {
            const processExplainData = processData.map(processExplain => ({ Explain: processExplain.Explain, idx: processExplain.idx }));
            res.json(processExplainData);
        } else {
            res.status(401).json({ message: '인증되지 않았습니다.' });
        }
    } catch (error) {
        console.error('Error fetching student user list:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
}