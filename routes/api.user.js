const User = require('./../models/user').UserDoc

function getUser() {
    app.get('/api/user', (req, res) => {
        const userData = req.user;
        console.log('USER ', userData)
        res.send(JSON.stringify(userData))
    })
    app.post('/api/user', (req, res) => {
        const value = req.body,
            id = req.user._id;
        if(req.body.status === 'admin') {
            console.log(value);
            const email = req.body.email;
            function updateUserDataAdmin(email, value, res) {
                console.log('Here admin')
                User.findOne({email: email}, (err, doc) => {

                    if (err) {
                        console.log(err);
                    }
                    else {
                        doc.fname = value.name;
                        doc.lname = value.surname;
                        doc.save().then(() => {
                            console.log('User was updated',doc);
                            res.send(doc);
                        })
                    }
                })
            }
            updateUserDataAdmin(email,value,res);
        } else {
            function updateUserData(id, value, res) {

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
            updateUserData(id, value, res)
        }

        // res.send(JSON.stringify(req.user))
    })
}

module.exports = getUser