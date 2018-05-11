const {UserDoc, CommentDoc} = require('../models/user');

const dispatch = require('../core/config/utils/dispatch');

function getLeadsController(req, res) {
    dispatch(req, res, actor)
}

function sliceAndPush(arr, id, obj) {
    arr[id].employees.splice(id, 1)
    arr.push(obj)
}


function* actor(req) {
    const manager = req.user.id || '';
    const leadsList = yield UserDoc.find({role: 'lead'});
    const leadsComments = yield leadsList.map(lead => {
        if (lead.manager[0] === manager) {  // lead.manager is array of one manager
            return {
                name: lead.fname,
                surname: lead.lname,
                avatar: lead.avatar,
                employees: CommentDoc.find({lead: lead.email})
            }
        }
    }).filter(lead => lead);
    const [employees] = yield leadsComments.map(lead => lead.employees.map(msg => UserDoc.findById(msg.employee)))
    const base = [];
    leadsComments.forEach(lead => {
        lead.employees.forEach(msg => {
            employees.forEach(empl => {
                String(msg.employee) === String(empl._id) ?
                    base.push({
                        [msg.employee]: empl
                    }) : null;
            })
        })
    });
    const resultComments = {data: leadsComments, user: base};

    /*console.log(
        'EMPLOYEES +++> ', employees,
        'LEADS +++> ', leadsComments);*/
    console.log(resultComments);
    return resultComments;
}

/*console.log('LEADS ', leadsComments)
yield leadsComments.forEach((leads, id, leadsArr) => {
    console.log(leads)
    leads.employees.forEach(message => {
        const cEmployee = message.employee;
        const cUser = UserDoc.findOne({id:cEmployee});
        message.employee = `${cUser.fname} ${cUser.lname} `
    })
});*/


module.exports = getLeadsController
/*
    const comments = yield leadsComments
        .filter(lead => lead)
        .map(own_lead => {
            return own_lead.employees.map(message => UserDoc.findById(message.employee))
        })
    leadsComments.forEach((lead, id, leadsArr) =>
        comments.forEach((comments, id, commentsArr) => {
                console.log('Lead ', lead, 'Comments ',  comments)
                leadsArr[id].employees[id] = `${comments.fname} ${comments.lname}`
            }
        ))*/