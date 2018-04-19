const db = require('../core/db'),
    UserDoc = require('../models/user').UserDoc;

function getUserList() {
    app.get('/api/getUserList', (req, res) => {
        db().on('error', function () {
            console.error('Trouble error');
            done(null, false)

        });
        db().once('open', function () {
            console.log('Open DB!');


            UserDoc.find({}, (error, data) => {
                console.log(data);
                res.send(JSON.stringify({data: data}))
            })
        })
    });
}
module.exports = getUserList