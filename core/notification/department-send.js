const {transporter, createMessage} = require('../nodemailer');
const {UserDoc, CommentDoc} = require('../../models/user');
const {dispatch} = require('../config/utils/pure_dispatch');
const moment = require('moment');
const schedule = require('node-schedule');



function * notifyDepartmentHead() {
    const to = yield UserDoc.findOne({role: 'department head'}).then(data => data);
    const comments = yield CommentDoc.find()
    const fcomments = comments.filter(comment => new Date(comment.date).getTime() > moment().startOf('month').valueOf())
    const users = yield UserDoc.find();
    const html = `  <div>
                  <b>${fcomments.length}: count of comments</b> 
                  <b>${users.length}: count of users</b>
                  <a href="http://localhost:4200/reviews">Visit manage page</a> </div>  `;
    return transporter.sendMail(createMessage({to: to || undefined, html}))
}
const printAsyncDepartment = () => {
    schedule.scheduleJob(`* * ${moment().endOf('month')} * * *`, () =>  dispatch(notifyDepartmentHead())
        .then(info => console.log('Message to Department Head ', info.messageId))
        .catch(err => console.log('When send mail error', err)))
}

module.exports = {
    printAsyncDepartment
}
