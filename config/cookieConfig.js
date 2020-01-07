module.exports = {
    secret: 'sLuckyWa', // 对session id 相关的cookie 进行签名
    name: 'cLuckyWa', //cookieName
    resave: false, // 是否每次都重新保存会话
    saveUninitialized: false, //是否保存未初始化的会话
    cookie: {
        // secure: true, //https
        maxAge: 10 * 60 * 1000, // 设置 session 的有效时间，单位毫秒
    },
}