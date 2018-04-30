const getLeadUser = require('../services/getMessage.service').getLeadUser;
const getIdByCookie = require('../controllers/getEmployees.controller').getIdFromCookie;
const getMessageListService = require('../services/getMessage.service').getMessageListService;


class LeadController {
    static getById(req, res) {
        const idLead = getIdByCookie(req);
        getLeadUser(idLead, res);
    }
}

class MessageListController {
    static getList(req, res) {
        if (req.user) {
            getMessageListService(req.user, res)
        } else {
            LeadController.getById(req, res);
        }
    }
}

module.exports.getMessagesListController = MessageListController.getList;