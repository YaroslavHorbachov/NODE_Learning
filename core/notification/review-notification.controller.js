const Scheduler = require('../scheduler').Scheduler;
const {startJob, cancelJob, checkJob, setDayOfWeek} = new Scheduler();
const {transporter, createMessage} = require('../nodemailer');
const {UserDoc, SettingsDoc, CommentDoc} = require('../../models/user');
const {isArray, createAndPush} = require('../config/utils/utils');
const {dispatch} = require('../config/utils/pure_dispatch');
const moment = require('moment')
let ActiveRule ;


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

async function getSettings() {
    const {date, footer, header} = await getSettingsService();
    return {date, footer, header}
}

function printAsync() {
    Promise.resolve()
        .then(() => console.log('Start ...'))
        .then(async () => await listLeads())
        .then(async (list) => {
            const data = await getSettings();
            return {...data, list}
        })
        .then(async ({date, footer, header, list}) => {
            console.log('Working ...');
            const rule = setDayOfWeek(date);
            if (checkJob()) {
                cancelJob();
                startJob(
                    rule,
                    () => {
                        notifyRelatedLeads({footer, header, list});
                        notifyRelatedManagers({footer, header,});
                    });
                console.log('Update scheduler');
                return true
            }
            startJob(
                rule,
                async () => {
                    await notifyRelatedLeads({footer, header, list});
                    notifyRelatedManagers({footer, header,});
                }
            );
            console.log('Create scheduler');
            return true
        })
}

function notifyRelatedLeads({footer, header, list}) {
    /* CONFIGURE SCHEDULER */
    Object.entries(list)
        .forEach(lead => {
            transporter
                .sendMail(setMessage({header, footer, list: lead[1].join('\n'), to: lead[0]}))
                .then(info => console.log('Message to Lead', info.messageId))
                .catch(err => console.log('When send mail error', err))
        })
}

function leadsOfManager() {
    return UserDoc.find()
        .then(async data => {
            const baseData = {};
            const managers = data.filter(user => user.role === 'lead').map(user => {
                baseData[user.manager] = isArray(baseData[user.manager]) ?
                    [...baseData[user.manager], user.email] :
                    [user.email];
                return user.manager

            });
            const managersProfile = await Promise.all(managers.map(id => UserDoc.findById(id)));
            return {baseData, managersProfile}
        })
}

function notifyRelatedManagers({footer, header}) {
    leadsOfManager()
        .then(({baseData, managersProfile}) => {
            const managers = Object.entries(baseData);
            managers.forEach((field, idx, arr) => {
                managersProfile.forEach((manager) => {
                    String(manager._id) === field[0] ? arr[idx][0] = manager.email : null
                })
            });
            return managers
        })
        .then(managers => {
            managers.forEach(([manager, employees]) => {
                transporter
                    .sendMail(setMessage({footer, header, list: employees, to: manager}))
                    .then(info => console.log('Message to Manager ', info.messageId))
                    .catch(err => console.log('When send mail error', err))
            })
        })
}



function createTextWithEmployees(header, footer, body) {
    return `
        <h3>${header}</h3>
        <pre>${body}</pre>
        <b>${footer}</b>
`
}


module.exports = {
    printAsync,
    leadsOfManager
};
