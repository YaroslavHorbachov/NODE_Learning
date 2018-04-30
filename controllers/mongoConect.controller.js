const UserDoc = require('../models/user').UserDoc,
    mongoConnectService = require('../services/mongoConnect.service'),
    bcrypt = require('bcryptjs');

class MongoController {
    static mongoConnect(req,res) {
        const user = MongoController.createConnection(req);
        function createUser(user) {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(user.password, salt, function (err, hash) {
                    user.password = hash;
                    console.log('Open DB!');
                    mongoConnectService(res, UserDoc, user);
                    console.log('Connection end')
                });
            });
        }
        createUser(user);
    }
    static createConnection(req){
        const body = req.body,
            fname = body.fname,
            lname = body.lname,
            email = body.email,
            password = body.password;
        return new UserDoc({
            fname: fname,
            lname: lname,
            email: email,
            password: password
        });
    }
}
module.exports = MongoController.mongoConnect;

