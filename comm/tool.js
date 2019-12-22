const tool = {
    isNull(obj) {

    },
    objIsNull(obj) {
        let isNull = true
        for (let key in obj) {
            if (key.length > 0) {
                isNull = false
            }
        }
        return isNull
    }
}
module.exports = tool