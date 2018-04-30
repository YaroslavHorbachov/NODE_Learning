const User = require('../models/user').UserDoc;
class updateUserDataController{
    static updateUserData(id, value, res) {
        User.findById(id, (err, doc) => {
            if (err) {
                console.log(err);
            }
            else {
                doc.fname = value.fname;
                doc.lname = value.lname;
                doc.save().then(() => {
                    console.log('User was updated');
                    res.send(doc)
                })
            }
        })
    }
}
module.exports = updateUserDataController.updateUserData;