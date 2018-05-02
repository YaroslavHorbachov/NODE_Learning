const UserDoc = require('../models/user').UserDoc;

function emailAuthController(req, res) {
    const id = req.query.id;
    console.log('Here')
    UserDoc.findById(id).then(doc => {

        doc.isEmailAuth = 'true';
        doc.save()
            .then(() => res.redirect(`http://localhost:4200/login;email=${doc.email.split('.')}`))
            .catch((err) => {
                console.log(' =>         Error on email save')
                console.log(err)
                res.redirect('http://localhost:4200/login/')
            })
    }).catch(err => {
        console.log(' =>         Error on email valid');
        console.log(err)
        res.redirect('http://localhost:4200/login')
    })
}
module.exports = emailAuthController;