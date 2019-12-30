const mysql = require('mysql');
const dbConfig = require('../config/dbConfig');
var toolConfig = require('../config/toolConfig');
var bcrypt = require('bcryptjs');
const SQL = require('../sql/userMapping');
// const pool = mysql.createPool(dbConfig.mysql);
const connection = mysql.createConnection(dbConfig.mysql);
var salt = bcrypt.genSaltSync(toolConfig.genSaltSync);

// 向前台返回JSON方法的简单封装
const resultJson = function (response, result, error) {
    if (typeof result === 'undefined') {
        response.json({
            code: 200,
            status: false,
            msg: '操作失败'
        });
    } else {
        console.log(result);
        response.json(result);
        console.log('a');
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
                    //   resultJson(err, result);
                    res.json({
                        code: 200,
                        status: true,
                        msg: '注册成功'
                    });
                });
            } else {
                res.json({
                    code: 200,
                    status: false,
                    msg: '该账号已经被注册'
                });
            }
        });
    },
    delete(req, res, next) {
        pool.getConnection(function (err, connection) {
            var id = +req.query.id;
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
        var param = req.body;
        if (param.name == null || param.age == null || param.id == null) {
            resultJson(res, undefined);
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
        var id = req.query.id;
        // pool.getConnection(function (err, connection) {
        connection.query(SQL.queryAllById, id, function (err, result) {
            resultJson(res, result, err);
            // connection.release();// pool释放连接
        });
        // });
    },
    queryCountByAccount(req, res, next) {
        var userAccount = req.body.userAccount;
        connection.query(SQL.queryCountByAccount, userAccount, function (
            err,
            result
        ) {
            resultJson(res, result, err);
        });
    },
    queryAllByAccount(req, res, next) {
        var userAccount = req.query.userAccount;
        connection.query(SQL.queryAllByAccount, userAccount, function (err, result) {
            resultJson(res, result, err);
        });
    },
    queryAll(req, res, next) {
        connection.query(SQL.queryAll, function (err, result) {
            resultJson(res, result, err);
        });
    },
    logIn(req, res, next) {
        const userPwd = req.body.userPwd;
        const userAccount = req.body.userAccount;
        connection.query(SQL.queryByAccount, userAccount, function (err, result) {
            // countSize = Object.values(result[0])[0]
            if (result.length > 0) {
                let logInId = null;
                for (let i = 0; i < result.length; i++) {
                    const item = Object.values(result[i]);
                    const userPwdDB = item[2];
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
                        logInId = item[0];
                        break;
                    }
                }
                if (logInId) {
                    connection.query(SQL.queryAllById, logInId, function (err, result) {
                        req.session.userInfo = Object.values(result[0])[1];
                        resultJson(res, result, err);
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
                    msg: '该账号没有注册'
                });
            }
        });
    },
    logOut(req, res, next) {
        delete req.session.userInfo;
        res.clearCookie(config.sessionId);
        res.json({
            code: 200,
            status: true,
            msg: '注销成功'
        });
    }
};

module.exports = userDao;