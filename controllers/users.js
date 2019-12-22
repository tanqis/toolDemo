var Users = require('../modules/users');
var bcrypt = require('bcryptjs');
var config = require('../bin/config');
var tool = require('../comm/tool');
var salt = bcrypt.genSaltSync(config.genSaltSync);

module.exports = {
    add: function (req, res, next) {
        req.body.userPwd = bcrypt.hashSync(req.body.userPwd, salt);
        var _users = new Users(req.body);
        _users.save(function (err, users) {
            if (err) {
                console.log(err);
            } else {
                res.json({
                    data: users
                });
            }
        });
    },
    delete: function (req, res) {
        var id = req.query._id;
        Users.remove({
                _id: id
            },
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    //  res.json({
                    //      data: users
                    //  });
                }
            }
        );
    },
    update: function (req, res) {
        var id = req.body.id;
        var userParams = req.body;
        Users.findById(id, function (err, user) {
            if (err) {
                //doSomething...
            } else {
                _user = _.extend(user, userParams);
                _user.save(function (err, user) {
                    if (err) {
                        //doSomething...
                    } else {
                        //doSomething...
                    }
                });
            }
        });
    },
    list: function (req, res) {
        Users.fetch(function (err, users) {
            if (err) {
                console.log(err);
            } else {
                res.json({
                    data: users
                });
            }
        });
    },
    logIn: function (req, res) {
        const _userPwd = req.body.userPwd;
        Users.findListByObj({
                userEmail: req.body.userEmail
            },
            function (err, users) {
                if (err) {
                    console.log(err);
                } else {
                    if (!tool.objIsNull(users)) {
                        let isUser = null;
                        for (let item = 0; item < users.length; item++) {
                            const user = users[item];
                            const userPwdDB = user.userPwd;
                            const userPwdStr = userPwdDB.substr(0, 29);
                            const userPwdNew = bcrypt.hashSync(_userPwd, userPwdStr);
                            if (userPwdDB === userPwdNew) {
                                isUser = users[item];
                                break
                            }
                        }
                        if (isUser) {
                            req.session.userInfo = isUser.userName;
                            res.json({
                                data: isUser
                            });
                        } else {
                            res.json({
                                code: 200,
                                status: false,
                                msg: '账号或者密码错误'
                            });
                        }
                    } else {
                        res.json({
                            code: 200,
                            status: false,
                            msg: '登录失败,该账号未注册'
                        });
                    }
                }
            }
        );
    },
    logOut: function (req, res) {
        delete req.session.userInfo
        res.clearCookie(config.sessionId);
        res.json({
            code: 200,
            status: true,
            msg: '注销成功'
        });
    }
};