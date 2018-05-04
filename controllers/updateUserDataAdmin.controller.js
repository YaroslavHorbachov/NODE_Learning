const User = require('../models/user').UserDoc;
const {isArray, createAndPush} = require('../core/config/utils/utils')

class updateUserDataAdminController {
    static updateUserDataAdmin(email, value, res) {
        console.log('Here admin');
        User.findOne({email: email}, (err, doc) => {
            if (err) {
                console.log(err);
            }
            else {
                doc.fname = value.name;
                doc.lname = value.surname;
                doc.role = value.role;
                doc.leads = value.leads;
                doc.lastModified = new Date().getTime();
                doc.save()
                    .then(() => {
                        console.log('User was updated', doc);
                        res.send(doc);
                    })
            }
        })
    }
}
/*

function addEmployee(leadArr, employee) {
    leadArr.forEach(lead => {
        updateEmployeesService(lead, employee)
    })
}

function updateEmployeesService(lead, employee) {
    User
        .findOne({email: lead})
        .then(lead => {
            const date = new Date().toLocaleDateString();
            lead.employees = [{[date]: employee}];
            console.log('Current lead ', lead);
            lead
                .save()
                .then(() => {
                    return User.find({}).then(doc => console.log(doc))
                })
                .catch(err => console.log('When save lead ', err))
        }).catch(err => {
        console.log('Error when save employees ', err)
    })
}
*/

module.exports = updateUserDataAdminController.updateUserDataAdmin;