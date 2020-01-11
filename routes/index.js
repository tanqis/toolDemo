const express = require('express');
const jwtTool = require('../config/jwt')
const router = express.Router();

//过滤器
router.all('*', function (req, res, next) {
    const token = req.get("Authorization");
    if (token) {
        if (jwtTool.verifyToken(token)) {
            next();
        } else {
            res.json({
                code: 401,
                status: false,
                msg: "令牌过期，请重新登录~~~"
            })
        }
    } else {
        if (req.url.indexOf("/user/userLogIn") >= 0 || req.url.indexOf("/user/userRegister") >= 0) {
            next();
        } else {
            res.json({
                code: 401,
                status: false,
                msg: "未登录，请重新登录~~~"
            })
        }
    }
});
module.exports = router;