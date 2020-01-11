const mysql = require('mysql');
const dbConfig = require('../config/dbConfig');
const toolConfig = require('../config/toolConfig');
// const cookieConfig = require('../config/cookieConfig');
const bcrypt = require('bcryptjs');
const SQL = require('../sql/userMapping');
const connection = mysql.createConnection(dbConfig.mysql);
const salt = bcrypt.genSaltSync(toolConfig.genSaltSync);
const jwtTool = require('../config/jwt')

const resultJson = function (err, res, result, msg = '') {
    if (err) {
        res.json({
            code: 200,
            status: false,
            msg: msg ? msg : '操作失败',
            data: result
        });
    } else {
        res.json({
            code: 200,
            status: true,
            msg: msg ? msg : '操作成功',
            data: result
        });
    }
};

const userDao = {
    insert(req, res, next) {
        connection.query(SQL.queryCountByAccount, req.body.userAccount, function (
            err,
            result
        ) {
            const countSize = Object.values(result[0])[0];
            if (countSize <= 0) {
                const nowTime = new Date();
                const params = [
                    req.body.userAccount,
                    bcrypt.hashSync(req.body.userPwd, salt),
                    nowTime,
                    nowTime
                ];
                connection.query(SQL.insert, params, function (err, result) {
                    resultJson(err, res, null, '注册成功');
                });
            } else {
                resultJson(true, res, null, '该账号已经被注册');
            }
        });
    },
    delete(req, res, next) {
        pool.getConnection(function (err, connection) {
            let id = +req.query.id;
            connection.query(SQL.delete, id, function (err, result) {
                if (result.affectedRows > 0) {
                    result = {
                        code: 200,
                        msg: '删除成功'
                    };
                } else {
                    result = void 0;
                }
                resultJson(res, result, err);
                connection.release();
            });
        });
    },
    update(req, res, next) {
        // update by id
        // 为了简单，要求同时传name和age两个参数
        let param = req.body;
        if (param.name == null || param.age == null || param.id == null) {
            resultJson(err, result);
            return;
        }

        // pool.getConnection(function (err, connection) {
        connection.query(SQL.update, [param.name, param.age, +param.id], function (
            err,
            result
        ) {
            // 使用页面进行跳转提示
            if (result.affectedRows > 0) {
                res.render('suc', {
                    result: result
                }); // 第二个参数可以直接在jade中使用
            } else {
                res.render('fail', {
                    result: result
                });
            }

            connection.release();
        });
        // });
    },
    queryAllById(req, res, next) {
        const id = req.query.id;
        // pool.getConnection(function (err, connection) {
        connection.query(SQL.queryAllById, id, function (err, result) {
            resultJson(err, res, result);
            // connection.release();// pool释放连接
        });
        // });
    },
    queryCountByAccount(req, res, next) {
        const userAccount = req.body.userAccount;
        connection.query(SQL.queryCountByAccount, userAccount, function (
            err,
            result
        ) {
            resultJson(err, res, result);
        });
    },
    queryAllByAccount(req, res, next) {
        const userAccount = req.query.userAccount;
        connection.query(SQL.queryAllByAccount, userAccount, function (err, result) {
            resultJson(err, res, result);
        });
    },
    queryAll(req, res, next) {
        connection.query(SQL.queryAll, function (err, result) {
            resultJson(err, res, result);
        });
    },
    logIn(req, res, next) {
        const userPwd = req.body.userPwd;
        const userAccount = req.body.userAccount;

        connection.query(SQL.queryByAccount, userAccount, function (err, result) {
            if (result.length > 0) {
                let logInId = null;
                for (let i = 0; i < result.length; i++) {
                    const item = result[i]
                    const userPwdDB = item.UserPwd;
                    const userPwdStr = userPwdDB.substr(0, 29);
                    let userPwdNew = '';
                    try {
                        userPwdNew = bcrypt.hashSync(userPwd, userPwdStr);
                    } catch (err) {
                        res.json({
                            code: 200,
                            status: false,
                            msg: '该账号异常，请联系管理员'
                        });
                    }
                    if (userPwdDB === userPwdNew) {
                        logInId = item.id;
                        break;
                    }
                }
                if (logInId) {
                    connection.query(SQL.queryAllById, logInId, function (err, result) {
                        resultJson(err, res, {
                            Authorization: jwtTool.generateToken({
                                ...result[0]
                            })
                        }, '登录成功');
                    });
                } else {
                    resultJson(true, res, null, '账号或者密码错误');
                }
            } else {
                resultJson(true, res, null, '该账号没有注册');
            }
        });
    },
    logOut(req, res, next) {
        //     try {
        //         req.session.userInfo = null;
        //         delete req.session.userInfo;
        //         res.clearCookie(cookieConfig.secret);
        //     } catch (error) {
        //         console.log(error);
        //     }
        //     resultJson(false, res, null, '退出成功');
    }
};

module.exports = userDao;