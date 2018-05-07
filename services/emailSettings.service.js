const SettingsDoc = require('../models/user').SettingsDoc;
const emailAsync = require('../controllers/review-notification.controller').printAsync;

function createSettingsDocService({header, footer, date}) {
    return new SettingsDoc({header, footer, date});
}

function updateSettingDocService(doc, {header, footer, date}) {
    doc.header = header;
    doc.footer = footer;
    doc.date = date;
    return doc
}
function create(settings) {
    createSettingsDocService(settings)
        .save()
        .then(() => emailAsync())
        .then(() => console.log('Settings Document ready '))
}
function update(doc,settings){
    updateSettingDocService(doc, settings)
        .save()
        .then(() => emailAsync())
        .then(() => console.log('Settings Document updated'))
}

module.exports = {
     create,
     update
}