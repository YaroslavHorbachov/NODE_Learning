const getMessageHistoryService = require('../services/getMessageHistory.service');

function getMessageHistoryController(req, res) {
    const email = req.user.email;
    getMessageHistoryService(email, res)
}

module.exports = getMessageHistoryController