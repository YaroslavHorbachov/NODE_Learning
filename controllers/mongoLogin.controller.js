const db = require('../core/db'),
    UserDoc = require('../models/user').UserDoc,
    bcrypt = require('bcryptjs');

function mongoLogin(email, password, done) {

   /* db().on('error', function () {
        console.error('Trouble error');
        done(null, false)

    });
    db().once('open', function () {
        console.log('Open DB!');

*/


}

module.exports = mongoLogin;
