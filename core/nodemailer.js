const nodeMailer = require('nodemailer');
const {EMAIL, PASSWORD} = require('../core/config/credentials');

const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: EMAIL,
        pass: PASSWORD
    }
});

function createMessage({
                           from = '"Gorbachov Yaroslav 👻" <SecondFloor@ITCraft.com>',
                           to = 'jonny_0154@outlook.com',
                           subject = 'Hello ✔ Dmitriy',
                           html = '<h1>Test EMAIL </h1>',
                           attachments = []
                       }) {
    return {
        from, to, subject, html, attachments
    }
}


module.exports = {
    createMessage,
    transporter
}

