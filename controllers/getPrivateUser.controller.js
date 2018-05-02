const UserDoc = require('../models/user').UserDoc;

class getPrivateUserController {
    static getPrivateUser(req, res) {
        const email = req.body.email;
        console.log('Email', email);
        UserDoc.findOne({email: email})
            .then(doc => {
                console.log('DOC', doc)
                doc.isEmailAuth === 'true' ?
                    res.send(JSON.stringify({
                        status: 'done',
                        data: doc
                    })) :
                    res.send(JSON.stringify({status: 'error'}))
            })
            .catch(err => {
                console.log(' =>         Error on email valid');
                console.log(err)
                res.redirect('http://localhost:4200/login')
            })
    }
}

module.exports.getPrivateUserController = getPrivateUserController.getPrivateUser;