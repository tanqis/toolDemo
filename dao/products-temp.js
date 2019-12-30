var Products = require('../../modules/futures/products');
var bcrypt = require('bcryptjs');
var config = require('../../bin/config');
var tool = require('../../comm/tool');
const extend = require('extend');
var salt = bcrypt.genSaltSync(config.genSaltSync);

module.exports = {
  add: function (req, res, next) {
    var _products = new Products(req.body);
    _products.save(function (err, products) {
      if (err) {
        console.log(err);
      } else {
        res.json({
          code: 200,
          status: true,
          msg: '添加成功'
        });
      }
    });
  },
  updateById: function (req, res) {
    var productParams = req.body;
    Products.findById(req.body._id, function (err, product) {
      console.log('product', product);
      if (err) {
        res.json({
          code: 200,
          status: false,
          msg: '更新失败,不存在该条记录'
        });
      } else {
        var _product = extend(product, productParams);
        _product.save((err2, user) => {
          if (err2) {
            res.json({
              code: 200,
              status: false,
              msg: '更新失败' + err2
            });
          } else {
            res.json({
              code: 200,
              status: true,
              msg: '更新成功'
            });
          }
        });
      }
    });
  },
  delById: function (req, res) {
    Products.remove({
        _id: req.body._id
      },
      function (err) {
        if (err) {
          res.json({
            code: 200,
            status: false,
            msg: err
          });
        } else {
          res.json({
            code: 200,
            status: true,
            msg: '删除成功'
          });
        }
      }
    );
  },
  findListByObj: function (req, res) {
    Products.findById({
        _id: req.query._id
      },
      function (err, products) {
        if (err) {
          console.log(err);
        } else {
          res.json(products);
        }
      }
    );
  },
  findAllList: function (req, res) {
    Products.fetch(function (err, products) {
      if (err) {
        console.log(err);
      } else {
        res.json(products);
      }
    });
  }
};