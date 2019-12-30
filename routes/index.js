var express = require('express');
// var Products = require('../controllers/futures/products');
var router = express.Router();

router.all('*', function (req, res, next) {
    console.log('我是过滤器')
    next()
    // if (req.session.userInfo) {
    //   console.log(`【${req.session.userInfo}】欢迎您回来...`);
    //   next();
    // } else { 
    //   if (req.url.indexOf("/toolsCore/API/users/userLogIn") >= 0 || req.url.indexOf("/toolsCore/API/users/userRegister") >= 0) {
    //     next();
    //   } else {
    //     res.json({
    //       code: 401,
    //       status: false,
    //       msg: "未登录，请重新登录~~~"
    //     })
    //   }
    // }
});

// router.post('/toolsCore/API/products/addProduct', function (req, res) {
//   Products.add(req, res)
// });
// router.post('/toolsCore/API/products/updateById', function (req, res) {
//   Products.updateById(req, res)
// });
// router.post('/toolsCore/API/products/findAllList', function (req, res) {
//   Products.findAllList(req, res)
// });
// router.get('/toolsCore/API/products/findListByObj', function (req, res) {
//   Products.findListByObj(req, res)
// });
// router.post('/toolsCore/API/products/delProduct', function (req, res) {
//   Products.delById(req, res)
// }); 
module.exports = router;