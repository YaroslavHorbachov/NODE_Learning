const SettingsDoc = require('../models/user').SettingsDoc;
const {create, update} = require('../services/emailSettings.service');

function setEmailSettingsController(req, res) {
    const {header, footer, date} = req.body,
        settings = {header, footer, date};
    SettingsDoc
        .findOne()
        .then(async doc => {
            if(doc) {
               await update(doc,settings)
            } else {
               await create(settings)
            }
        })
        .catch(err => {
            res.send(err)
        })

}


module.exports = {
    setEmailSettingsController
}