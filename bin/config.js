module.exports = {
    sessionSecret: 'tanqis', // 对session id 相关的cookie 进行签名
    sessionId: 'tanqisTool', //cookieName
    cookieMaxAge: 10000 * 60, // 设置 session 的有效时间，单位毫秒
    genSaltSync: 10
}