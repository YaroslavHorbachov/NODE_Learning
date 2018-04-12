const db = require('../core/db'),
    UserDoc = require('../models/user').UserDoc,
    mongoConnectService = require('../services/mongoConnect.service');

function mongoConnect(req, res) {
    const email = req.body.email,
        password = req.body.password;
    const user = new UserDoc({
        email: email,
        password: password
    });
    db().on('error', function () {
        console.error('Trouble error');
    });
    db().once('open', function () {
        console.log('Open DB!');
        mongoConnectService(res, UserDoc, user);
        console.log('Connection end')
    });
}

module.exports = mongoConnect;

