module.exports = {
    secret: 'tanqis', // 对session id 相关的cookie 进行签名
    name: 'tanqisTool', //cookieName
    resave: false, // 是否每次都重新保存会话
    saveUninitialized: true, //是否保存未初始化的会话
    cookie: {
        maxAge: 10000 * 60, // 设置 session 的有效时间，单位毫秒
    },
}