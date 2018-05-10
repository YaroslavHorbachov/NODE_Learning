const CommentDoc = require('../models/user').CommentDoc;
const UserDoc = require('../models/user').UserDoc;

function getMessageListService(value, res) {
    CommentDoc
        .find({[value.role]: value.email})
        .then(data => {
            console.log('Message successfully find ', data);
            res.send(JSON.stringify(data));
        })
        .catch(err => {
            console.log('Problem with searching messages ', err);
        })
}

function getLeadUser(idLead, res) {
    UserDoc.findById(idLead)
        .then(lead => getMessageListService(lead, res))
        .catch(err => {
            console.log('Error when find lead by ID', err.errmsg)
        })
}

module.exports.getLeadUser = getLeadUser;
module.exports.getMessageListService = getMessageListService;