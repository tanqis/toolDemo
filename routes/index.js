var express = require('express');
var Users = require('../controllers/users');
var Products = require('../controllers/futures/products');
var router = express.Router();

router.all('*', function (req, res, next) {
  if (req.session.userInfo) {
    console.log(req.session.userInfo + "欢迎您回来");
    next();
  } else {
    if (req.url.indexOf("/toolsCore/API/users/userLogIn") >= 0 || req.url.indexOf("/toolsCore/API/users/userRegister") >= 0) {
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

router.post('/toolsCore/API/products/addProduct', function (req, res) {
  Products.add(req, res)
});
router.post('/toolsCore/API/products/updateById', function (req, res) {
  Products.updateById(req, res)
});
router.post('/toolsCore/API/products/findAllList', function (req, res) {
  Products.findAllList(req, res)
});
router.get('/toolsCore/API/products/findListByObj', function (req, res) {
  Products.findListByObj(req, res)
});
router.post('/toolsCore/API/products/delProduct', function (req, res) {
  Products.delById(req, res)
});
//注册
router.post('/toolsCore/API/users/userRegister', function (req, res) {
  Users.add(req, res)
});
//登录
router.post('/toolsCore/API/users/userLogIn', function (req, res) {
  Users.logIn(req, res)
});
//注销
router.get('/toolsCore/API/users/userLogOut', function (req, res) {
  Users.logOut(req, res)
});
//查询所有用户数据
router.get('/toolsCore/API/users/userFindAll', function (req, res, next) {
  Users.list(req, res)
});
router.get('/toolsCore/API/users/findByObj', function (req, res, next) {
  Users.findByObj(req.query, function (err, users) {
    if (err) {
      console.log(err);
    }
    res.json({
      data: users
    });
  })
});
router.get('/toolsCore/API/test', function (req, res, next) {
  res.json([{
    name: '测试数据1'
  }, {
    name: '测试数据2'
  }, {
    name: '测试数据3'
  }]);
});

module.exports = router;