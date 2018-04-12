const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema(
    {email: String, password: String},
    {versionKey: false}
);
const UserDoc = mongoose.model(global.userModel, userSchema);
module.exports.UserDoc = UserDoc;