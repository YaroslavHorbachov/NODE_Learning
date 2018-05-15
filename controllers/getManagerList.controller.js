const leadsOfManager = require('./review-notification.controller').leadsOfManager;
const dispatch = require('../core/config/utils/dispatch');
const UserDoc = require('../models/user').UserDoc;
const co = require('co');

function getManagersList(req, res) {
    dispatch(req,res,actor)
}
function *actor (req){
    const user = req.user.id;
    const {baseData} = yield leadsOfManager();
    const listOfEmployees = baseData[user];
    const result = yield listOfEmployees.map(email => UserDoc.find({email: email}));
    console.log(result)
    return result;
}


module.exports = {
    getManagersList
}

// TODO new Date(2018,3,1) LAST DAY OF MONTH
