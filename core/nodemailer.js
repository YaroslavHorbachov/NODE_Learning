const nodeMailer = require('nodemailer');
const {EMAIL, PASSWORD} = require('../core/config/credentials');
// create reusable transporter object using the default SMTP transport
const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: EMAIL,
        pass: PASSWORD
    }
});


// setup email data with unicode symbols


/*let mailOptions = {
    from: '"Freddy Foo 👻" <MyApp@Task6.com>', // sender address
    to: '1mohame@7uy35p.cf', // list of receivers
    subject: 'Hello ✔ Dmitriy', // Subject line// plain text body
    html: '<b>Hello world and Fuck?</b>' // html body
};*/

function createMessage({
    from = '"Gorbachov Yaroslav 👻" <SecondFloor@ITCraft.com>',
    to = 'jonny_0154@outlook.com',
    subject = 'Hello ✔ Dmitriy',
    html = '<h1>Test EMAIL </h1>'}) {
    return {
        from, to, subject, html
    }
}

// send mail with defined transport object


module.exports = {
    createMessage,
    transporter
}

