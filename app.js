const createError = require('http-errors');
const express = require('express');
const app = express();
const session = require('express-session'); //Express 模块中间件，方便我们处理客户端的 session。
const bodyParser = require('body-parser'); //Express 模块的中间件，方便我们解析浏览器发送来的 body 数据。
const cors = require('cors'); //渲染引擎。 方便我们将后台变量数据绑定到前台页面上。
const expressWs = require('express-ws');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan'); //日志中间件，也可以脱离express，作为node.js的日志组件单独使用
const cookieConfig = require('./config/cookieConfig');

expressWs(app);

//API接口过滤
app.use(
  cors({
    origin: ['http://localhost:8087'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Conten-Type', 'Authorization']
  })
);

// 设置视图引擎目录
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 使用 session 中间件
app.use(session(cookieConfig));
// app.use(favicon());
app.use(logger('dev'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));
app.use('/ws', require('./routes/ws/msg'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;