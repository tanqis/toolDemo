let express = require('express');
let router = express.Router();

//过滤器
router.all('*', function (req, res, next) {
    console.log(req.session.userInfo)
    if (req.session.userInfo) {
        // console.log(`【${req.session.userInfo}】欢迎您回来...`);
        next();
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