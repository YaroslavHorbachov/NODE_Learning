const {CommentDoc, UserDoc, ReviewDoc} = require('../../models/user');
const dispatch = require('../../core/config/utils/dispatch');
const pure = require('../../core/config/utils/pure_dispatch').dispatch;
const {ReviewActionRequest, ErrorHandler} = require('./department-review.model')
const moment = require('moment');

class DepartmentController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    get allEmployees() {
        const actor = function* () {
            const {skip, limit} = {...this.req.body};
            return yield this.sub(skip, limit);

        }.bind(this);
        dispatch(null, this.res, actor);
    }

    sub(skip = 0, limit = null) {
        return new Promise(
            res => UserDoc.find()
                .skip(skip)
                .limit(limit)
                .then(data => res(data))
                .catch(console.log));
    }


    get allMessagesOfMonth() {
        const actor = function* () {
            const comments = yield CommentDoc.find();
            return comments
                .filter(comment => new Date(comment.date).getTime() > moment().startOf('month').valueOf());
        }
        dispatch(null, this.res, actor)
    }

    get commentedEmployee() {
        const actor = function* () {
            const {skip, limit} = {...this.req.body}

            const allEmployees = yield this.sub();

            const comments = yield new Promise(res => CommentDoc.find().then(res)); // FOR BIG DATA .skip().limit()

            const find = yield allEmployees.map(employee => CommentDoc.find({employee: employee.id}))

            const clean = find.filter(x=>x.length).map(userA => userA[0].employee)

            return allEmployees.filter(user => clean.includes(String(user._id))).splice(skip, limit) // simulate 
        }
            .bind(this)
        dispatch(null, this.res, actor)
    }

    get reviewAction() {
        try {
            const actor = function* () {
                return yield new Promise(
                    res => this.takeAllReview()
                        .then(res)
                        .catch(res))
            }.bind(this);
            dispatch(null, this.res, actor)
        } catch (e) {
            ErrorHandler({res: this.res, text: 'Double population error', error: e})
        }
    }

    setReview() {
        try {
            const actor = function* () {
                const create = function* () {
                    const review = new ReviewDoc({
                        author, employee, date: new Date().getTime()
                    });
                    return yield review.save()
                };
                const {_id: employee, _doc: {_id: author}} = {...this.req.body, ...this.req.user};
                const Reports = yield new Promise(res => ReviewDoc.find().populate('employee').then(res))
                const isReported = Reports.map(report => String(report.employee._id) === employee);
                return isReported.some(el => el) ?  null : yield create()

            }.bind(this)
            dispatch(null, this.res, actor)
        }
        catch (e) {
            console.log(e)
            ErrorHandler({res: this.res, text: 'Request body error ', error: e})
        }
    }

    takeAllReview() {
        return ReviewDoc.find().populate('author').populate('employee')
    }

    takeReview() {
        try {
            const actor = function* () {
                const allReview = yield new Promise(res => this.takeAllReview().then(res));
                const listR = yield UserDoc.find()
                console.log(listR.length, allReview.length);
                return listR
            }.bind(this);

            dispatch(null, this.res, actor)

        } catch (e) {
            console.log(e)
            ErrorHandler({res: this.res, text: 'Request body error ', error: e})
        }
    }
}


module.exports = {
    DepartmentController
}


/*
*  const withComment = yield function* () {
                const commentedEmployees = yield function* () {
                    return allEmployees.filter(empl => new Promise( res => CommentDoc.find({employee: empl._id}).then(data => res(data))))
                };
                console.log('WITH ', commentedEmployees.length)
                return yield pure(commentedEmployees);

                /*
                Promise.all(commentedEmployees).then(d => {
                    // console.log('In Promise ', d)
                    res(d)
                })*/

