const {UserDoc, CommentDoc} = require('../models/user');

const dispatch = require('../core/config/utils/dispatch');

function getLeadsController(req, res) {
    dispatch(req, res, actor)
}

function* actor() {
    const leadsList = yield UserDoc.find({role: 'lead'});
    const leadsComments = yield leadsList.map(lead => {
        return {
            name: lead.fname,
            surname: lead.lname,
            avatar: lead.avatar,
            employees: CommentDoc.find({lead: lead.email})
        }}
    );
    console.log(leadsComments);
    return leadsComments;
}

module.exports = getLeadsController