const db = require('../core/db'),
    UserDoc = require('../models/user').UserDoc,
    mongoConnectService = require('../services/mongoConnect.service'),
    bcrypt = require('bcryptjs');

function mongoConnect(req, res) {
    const body = req.body,
        fname = body.fname,
        lname = body.lname,
        email = body.email,
        password = body.password,
        password2 = body.password2;

    console.log('names ?:', fname, lname, email, password, password2);

    function createUser(user) {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(user.password, salt, function (err, hash) {
                user.password = hash;
            });
        });
    }

    const user = new UserDoc({
        fname: fname,
        lname: lname,
        email: email,
        password: password
    });

    createUser(user, function (err, user) {
        if (err) throw err;
        console.log('User hash password was created ', user);
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

