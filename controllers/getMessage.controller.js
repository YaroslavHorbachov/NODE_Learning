const getLeadUser = require('../services/getMessage.service').getLeadUser;
const getIdByCookie = require('../controllers/getEmployees.controller').getIdFromCookie;
const getMessageListService = require('../services/getMessage.service').getMessageListService;


function getLeadById(req, res) {
    const idLead = getIdByCookie(req);
    getLeadUser(idLead, res);
}
function getMessagesListController(req, res) {
    if (req.user) {
        getMessageListService(req.user, res)
    } else {
        getLeadById(req, res);
    }
}

module.exports.getMessagesListController = getMessagesListController;