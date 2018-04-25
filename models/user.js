const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        fname: {type: String, required: true},
        lname: {type: String, required: true},
        email: {type: String},
        password: {type: String},
        role: {type: String, default: 'employee', enum: ['lead', 'admin', 'employee']},
        leads: {type: Array, default: []},
        avatar: {type: String, default: `http://localhost:3020/images/avatar.jpg`},
        gid: {type: String, default: null},
        fid: {type: String, default: null}
    },
    {versionKey: false}
);

const commentSchema = new Schema({
    lead: {type: String, required: true},
    employee : {type: String, required: true},
    comment: {type: String, required: true}
}, {versionKey: false})

const UserDoc = mongoose.model(global.userModel, userSchema);
const CommentDoc = mongoose.model('Comment', commentSchema);
module.exports.CommentDoc = CommentDoc;
module.exports.UserDoc = UserDoc;
