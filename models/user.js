const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema(
    {fname: {type: String, required: true },
        lname: {type: String, required: true },
        email: {type: String, required: true },
        password: {type: String, required: true },
        role :{type: String, default: 'employee'},
        avatar: {type:String, default:`http://localhost:3020/images/avatar.jpg`}
            },
    {versionKey: false}
);
const UserDoc = mongoose.model(global.userModel, userSchema);
module.exports.UserDoc = UserDoc;