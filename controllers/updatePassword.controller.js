const bcrypt = require('bcryptjs');
const UserDoc = require('../models/user').UserDoc;
function updatePasswordController(req,res) {
    try {
        let user = req.user,
            {oldpassword, newpassword} = req.body;
        user = {...user._doc, oldpassword, newpassword};
        updatePasswordService(user,res);
    } catch (e) {
        res.send({err: e})
    }
}
function updatePasswordService(user,res){
    bcrypt.compare(user.oldpassword, user.password).then(bool => {
        if(bool){
            UserDoc.findById(user._id)
                .then(doc => {
                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(user.newpassword, salt, function (err, hash) {
                            doc.password = hash;
                            doc.save().then(() => res.status(200).send({status: 'done'}))
                        })
                    })
                })
        } else {
            res.send( {err : (new Error('Not are equal with old password'))})
        }
    }).catch((err) => res.send({err}))


}
module.exports = updatePasswordController;