const UserDoc = require('../models/user').UserDoc;

function getUserController(res) {
    UserDoc.find({}, (error, data) => {
        console.log(data);
        res.send(JSON.stringify({data: data}))
    });
}
module.exports = getUserController