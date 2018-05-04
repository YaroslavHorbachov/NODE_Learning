function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]'
}
function createAndPush(base, field, value){
    console.log('Util', base)
    base[field] = [];
    base[field].push(value)
    console.log('Util', base)
}
module.exports = {
    isArray,
    createAndPush
}