const User = require('./../models/user').UserDoc

function deleteUser() {
    app.post('/api/deleteUser', (req, res) => {
        const value = req.body;
        console.log('This value', value);
        User.findById(value._id).then(data => data.remove());
        res.send(req.user);

    })
}

module.exports = deleteUser;

/*(err, data) => {
            if (err) {
                console.log('Throw when delete usetr ', err)
            }
            else {
                console.log('Succefully deleting', data);
                data.save((err) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        res.send(data)
                    }
                })
            }
        })*/