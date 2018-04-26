let home = require('./server.routes/home');
let login = require('./login');
let register = require('./register');
let log = require('./api.log');
let change = require('./api.updateAvatar');
let getUserList = require('./api.getUserList');
let logout = require('./logout');
let loginGoogle = require('./loginGoogle');
let getUser = require('./api.user');
let deleteUser = require('./api.deleteUser');
let other = require('./server.routes/404');
let loginFacebook = require('./loginFacebook');
let loginAuthFacebook = require('./loginAuthFacebook');
let testNgRok = require('./test.ngRok');
let testNgRokLogout = require('./test.ngRokLogout');
let getUserData = require('./api.userState');
let getEmployees = require('./api.getEmployees');
let authGoogleRedirect = require('./loginAuthGoogle');
let getMessageList = require('./api.getMessagesList');
let sendMessage = require('./api.sendMessage');
module.exports = {
    log,
    sendMessage,
    getMessageList,
    getEmployees,
    getUserData,
    logout,
    testNgRok,
    testNgRokLogout,
    loginAuthFacebook,
    loginFacebook,
    authGoogleRedirect,
    loginGoogle,
    deleteUser,
    change,
    getUser,
    home,
    login,
    register,
    getUserList,
    other
};