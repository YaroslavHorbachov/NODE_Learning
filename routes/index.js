let root = require('./root');
let home = require('./home');
let login = require('./login');
let register = require('./register');
let log = require('./api.log');
let change = require('./api.updateAvatar');
let getUserList = require('./api.getUserList');
let logout = require('./logout');
let other = require('./404');
module.exports = {
    log,
    root,
    home,
    login,
    register,
    change,
    getUserList,
    logout,
    other
};