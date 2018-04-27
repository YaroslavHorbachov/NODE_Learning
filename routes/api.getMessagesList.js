const getMessagesListController= require('../controllers/getMessage.controller').getMessagesListController;

function getMessagesList() {
    app.get('/api/getMessages', (req, res) => {
        getMessagesListController(req, res);
    })
}

module.exports = getMessagesList;