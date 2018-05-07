const CommentDoc = require('../models/user').CommentDoc;

const getMessageHistory = (email, res) => {
    console.log(email)
    CommentDoc.find({lead: email}).then(data => res.send(data)).catch(err => res.send(err))
};
module.exports = getMessageHistory;