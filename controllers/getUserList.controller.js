const UserDoc = require('../models/user').UserDoc;

class UserController{
    static getUser(res) {
        UserDoc.find({}, (error, data) => {
            console.log(data);
            res.send(JSON.stringify({data: data}))
        });
    }
}

module.exports = UserController.getUser