const leadsOfManager = require('./review-notification.controller').leadsOfManager;
const UserDoc = require('../models/user').UserDoc
const co = require('co')

function getManagersList(req, res) {
    co(actor(req)).then(([data]) => res.send(data))
}
function *actor (req){
    const user = req.user.id;
    const {baseData} = yield leadsOfManager();
    const listOfEmployees = baseData[user];
    return yield listOfEmployees.map(email => UserDoc.find({email: email}))
}


module.exports = {
    getManagersList
}