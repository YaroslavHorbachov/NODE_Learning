const User = require('./../models/user').UserDoc;
function updateUserDataAdmin(email, value, res) {
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
            doc.save().then(() => {
                console.log('User was updated',doc);
                res.send(doc);
            })
        }
    })
}

module.exports = updateUserDataAdmin;