const User = require('../models/user').UserDoc;

class updateUserDataController {
    static updateUserData(id, value, res) {
        User.findById(id, (err, doc) => {
            if (err) {
                console.log(err);
            }
            else {
                if (value.status === 'modify') {
                    doc.fname = value.fname;
                    doc.lname = value.lname;
                    doc.lastModified = new Date().getTime();
                } else {
                    doc.lastVisit = new Date().getTime();
                }
                console.log('Prev docum', doc);
                doc
                    .save()
                    .then(() => {
                        console.log('User was updated');
                        res.send(doc)
                    })
            }
        })
    }
}

module.exports = updateUserDataController.updateUserData;