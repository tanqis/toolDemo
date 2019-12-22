var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var session = require('express-session');
var mongoose = require('mongoose');
var config = require('./bin/config');

mongoose.connect('mongodb://localhost/toolDB')
var db = mongoose.connection;
db.once('error', () => console.error("************************** MongoDB connection error!"))
db.once('open', () => console.info("************************** MongoDB connection successed!"))
var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var app = express();

//API接口过滤
app.use(cors({
  origin: ["http://localhost:8087"],
  methods: ["GET", "POST"],
  allowedHeaders: ["Conten-Type", "Authorization"]
}))
// 使用 session 中间件
app.use(session({
  secret: config.sessionSecret,
  name: config.sessionId,
  resave: false, // 是否每次都重新保存会话
  saveUninitialized: true, //是否保存未初始化的会话
  cookie: {
    maxAge: config.cookieMaxAge,
  },
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);

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