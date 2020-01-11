const jwt = require('jsonwebtoken');
const fs = require('fs');
const jwtTool = {
    timeOut: 10 * 60 * 1, // 0.5小时过期
    privateKey: 'lackywa-tanqis',
    generateToken(data) {
        let token = jwt.sign(
            data,
            this.privateKey, {
                expiresIn: this.timeOut
            }
        );
        return token;
    },
    verifyToken(token) {
        let isOk = false
        try {
            jwt.verify(token, this.privateKey)
            isOk = true
        } catch (err) {
            isOk = false
        }
        return isOk
    }
}

module.exports = jwtTool;