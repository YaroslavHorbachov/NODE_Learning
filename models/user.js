const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema(
    {fname: String, lname: String, email: String, password: String},
    {versionKey: false}
);
const UserDoc = mongoose.model(global.userModel, userSchema);
module.exports.UserDoc = UserDoc;