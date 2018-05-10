const UserDoc = require('../models/user').UserDoc;
const Comment = require('../models/user').CommentDoc;
const getIdByCookie = require('../controllers/getEmployees.controller').getIdFromCookie;

class sendMessageController {
    static async sendMessage(req, res) {
        let lead , manager , role;
        if (req.user) {
            const user = req.user;
            role = user.role;
            role === 'manager' ? manager = user.email : lead = user.email
        } else {
            lead = await sendMessageController.getLead(req);
        }
        const message = req.body.message;
        const employee = req.body.employee;
        const date = req.body.date;
        const comment = new Comment({
            manager,
            lead,
            message,
            employee,
            date
        });
        comment.save()
            .then(() => res.send(JSON.stringify({status: 'done'})))
            .catch(err => {
                console.log('Problem on save comment', err)
            })
    }

    static getLead(req) {
        return new Promise((res, rej) => {
            const idLead = getIdByCookie(req);
            UserDoc
                .findById(idLead)
                .then(doc => res(doc.email))
                .catch(err => rej(err))
        })
    }
}

module.exports.sendMessageController = sendMessageController.sendMessage;