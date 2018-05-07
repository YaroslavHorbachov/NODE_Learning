const {startJob, cancelJob, checkJob, setDayOfWeek} = require('../core/scheduler');
const {transporter, createMessage} = require('../core/nodemailer');
const {UserDoc, CommentDoc, SettingsDoc} = require('../models/user')
const {isArray, createAndPush} = require('../core/config/utils/utils');

function reviewNotificationController(date, cb) {
    startJob(date, cb)
}

async function listLeads() {
    return UserDoc
        .find()
        .then(doc => {
            const baseLead = {};
            const employees = doc.filter(user => user.leads.length)
            employees.forEach(user => {
                if (user.leads.length) {
                    user.leads
                        .forEach(lead => isArray(baseLead[lead]) ?
                            baseLead[lead].push(user.email) :
                            createAndPush(baseLead, lead, user.email))
                }
            });
            return baseLead
        })
        .catch(err => console.log('Error on listLeads ', err))

}

function setMessage({footer, header, list, to}) {
    return createMessage({
        to: to,
        subject: ' Leave are review for this people ',
        html: createTextWithEmployees(header, footer, list)
    })
}

async function getSettingsService() {
    return SettingsDoc.findOne().then(data => {
        return data
    }).catch(err => console.log('Some problem with settings ', err))
}


function printAsync() {
    Promise.resolve()
        .then(() => console.log('Start ...'))
        .then(async () => await listLeads())
        .then(async (list) => {
            const {date, footer, header} = await getSettingsService();
            return {date, footer, header, list}
        })
        .then(({date, footer, header, list}) => {
            console.log('Working ...');
            const rule = setDayOfWeek(date);
            if (checkJob()) {
                startJob(
                    rule,
                    () => notifyRelatedLeads({footer, header, list}));
                console.log('Update scheduler');
                return true
            }
            startJob(
                rule,
                () => notifyRelatedLeads({footer, header, list})
            );
            console.log('Create scheduler');
            return true
        })
}

function updateOrCreateJob() {
    console.log(checkJob())
}


function notifyRelatedLeads({footer, header, list}) {

    /* CONFIGURE SCHEDULER */


    Object.entries(list)
        .forEach(lead => {
            transporter
                .sendMail(setMessage({header, footer, list: lead[1].join('\n'), to: lead[0]}))
                .then(info => console.log('Message ',info.messageId))
                .catch(err => console.log('When send mail error', err))
        })
}

function createTextWithEmployees(header, footer, list) {
    return `
        <h3>${header}</h3>
        <pre>${list}</pre>
        <b>${footer}</b>
`
}

module.exports = {
    listLeads,
    printAsync
};

/*.then(doc =>{
            const baseLead = {};
            const employees = doc.filter(user => user.leads.length)
            employees.forEach(user => {
                if(user.leads.length) {
                    user.leads
                        .forEach(lead => isArray(baseLead[lead]) ?
                            baseLead[lead].push(user.email) :
                            createAndPush(baseLead, lead, user.email) )
                }
            })
            console.log(baseLead)
        })
        .catch(err => console.log('Error on listLeads ', err))*/