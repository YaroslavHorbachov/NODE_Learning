const SettingsDoc = require('../models/user').SettingsDoc;

function getEmailSettingsController(req, res) {
    SettingsDoc
        .findOne()
        .then(data => {
            console.log('OnInit get data ', data)
            return data;
        })
        .then(data => res.send(data))
        .catch(err => res.send(err));
}

module.exports.getEmailSettingsController = getEmailSettingsController