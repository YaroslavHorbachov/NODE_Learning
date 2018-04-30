/*
let home = require('./server.routes/home');
let login = require('./server/login');
let register = require('./server/register');
let log = require('./api/api.log');
let change = require('./api/api.updateAvatar');
let getUserList = require('./api/api.getUserList');
let logout = require('./server/logout');
let loginGoogle = require('./server/loginGoogle');
let getUser = require('./api/api.user');
let deleteUser = require('./api/api.deleteUser');
let other = require('./server.routes/404');
let loginFacebook = require('./server/loginFacebook');
let loginAuthFacebook = require('./server/loginAuthFacebook');
let testNgRok = require('./server/test.ngRok');
let testNgRokLogout = require('./server/test.ngRokLogout');
let getUserData = require('./api/api.userState');
let getEmployees = require('./api/api.getEmployees');
let authGoogleRedirect = require('./server/loginAuthGoogle');
let getMessageList = require('./api/api.getMessagesList');
let sendMessage = require('./api/api.sendMessage');
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
};*/

function deploy(){
    const api = require('./api');
    const server = require('./server');
    app.use('', api);
    app.use('',server);
}
module.exports = deploy;