const User = require('./../models/user').UserDoc;

function deleteUser() {
    app.post('/api/deleteUser', (req, res) => {
        const value = req.body;
        console.log('This value', value);
        User.findById(value._id).then(data => data.remove());
        res.send(req.user);

    })
}

module.exports = deleteUser;

