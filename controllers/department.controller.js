const dispatch = require('../core/config/utils/dispatch');
const {CommentDoc, UserDoc} = require('../models/user');
const moment = require('moment');

class DepartmentController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    get allEmployees() {
        const actor = function* () {
            return yield UserDoc.find()
        }
        dispatch(null, this.res, actor)
    }

    get allMessagesOfMonth() {
        const actor = function* () {
            const comments = yield CommentDoc.find()
            return comments
                .filter(comment => new Date(comment.date).getTime() > moment().startOf('month').valueOf());
        }
        dispatch(null, this.res, actor)
    }
}

module.exports = {
    DepartmentController
}
