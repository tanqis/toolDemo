var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');

// 查询所有用户数据ById
router.get('/queryAllById', function (req, res, next) {
  userDao.queryAllById(req, res, next)
});
// 查询所有用户数据
router.get('/queryAll', function (req, res, next) {
  userDao.queryAll(req, res, next)
});
// 查询账号重复
router.get('/queryCountByAccount', function (req, res, next) {
  userDao.queryCountByAccount(req, res, next)
});
// 注册
router.post('/userRegister', function (req, res) {
  userDao.insert(req, res)
});

// 登录
router.post('/userLogIn', function (req, res) {
  userDao.logIn(req, res)
});
// 注销
router.get('/userLogOut', function (req, res) {
  userDao.logOut(req, res)
});

module.exports = router;