let root = require('./root');
let home = require('./home');
let login = require('./login');
let register = require('./register');
let log = require('./api.log');
let other = require('./404');
module.exports = {
    log,
    root,
    home,
    login,
    register,
    other
};