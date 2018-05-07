function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]'
}
function createAndPush(base, field, value){
    base[field] = [];
    base[field].push(value)
}
module.exports = {
    isArray,
    createAndPush
}