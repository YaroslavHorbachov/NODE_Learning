const {CommentDoc, UserDoc, ReviewDoc} = require('../../models/user');
const dispatch = require('../../core/config/utils/dispatch');
const {ReviewActionRequest, ErrorHandler} = require('./department-review.model')
const {LIMIT} = require('./department.constants');
const moment = require('moment');
let COUNT;
let SKIP = 0;

class DepartmentController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    static check() {
        COUNT > SKIP ? SKIP += 3 : SKIP = 0;
        console.log(COUNT, SKIP)
    }

    get allEmployees() {
        const actor = function* () {
            COUNT = yield new Promise(res => UserDoc.find().count().then(res));
            return yield sub();
        }
        const sub = () => new Promise(
            res => UserDoc.find()
                .skip(SKIP).limit(LIMIT)
                .then((data) => {
                    DepartmentController.check();
                    res(data)
                }).catch(console.log));
        dispatch(null, this.res, actor)
    }

    get allMessagesOfMonth() {
        const actor = function* () {
            const comments = yield CommentDoc.find();
            return comments
                .filter(comment => new Date(comment.date).getTime() > moment().startOf('month').valueOf());
        }
        dispatch(null, this.res, actor)
    }

    get reviewAction() {
        try {
            const actor = function* () {
                yield new Promise(
                    res => ReviewDoc
                        .find()
                        .populate('author')
                        .populate('employee')
                        .then(res))
            };
            dispatch(null, this.res, actor(null))
        } catch (e) {
            ErrorHandler({res: this.res, text: 'Double population error', error: e})
        }
    }

    reviewAction() {
        try {
            const actor = function* () {
                const {author, employee} = new ReviewActionRequest(...this.req.body);
                console.log(author, employee)
            }
            dispatch(null, this.res, actor())
        }
        catch (e) {
            ErrorHandler({res: this.res, text: 'Request body error ', error: e})
        }
    }
}


module.exports = {
    DepartmentController
}
