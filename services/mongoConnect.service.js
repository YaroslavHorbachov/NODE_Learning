const {transporter, createMessage} = require('../core/nodemailer');

function mongoConnectService(res, model, user) {
    model.find({email: user.email}, function (err, doc) {
        if (err) {
            logger.error(err.errmsg)
        }
        else {
            console.log('Data', doc);
            if (doc.length > 0) {
                res.send(JSON.stringify({state: 'error'}));
            }
            else {
                user.save((err) => {
                    if (err) {
                        logger.error(err.errmsg);
                    } else {
                        console.log('Success');
                        preSend(user.id)
                        res.send(JSON.stringify({state: 'done'}))
                    }
                });
            }
        }
    })
}

function preSend(param) {
    const link = `http://localhost:3020/api/auth/email/?id=${param}`;
    const mObj = createMessage({
        html: `<a style="
color: rebeccapurple; 
background-color: burlywood" href = ${link} >REDIRECT TO AUTH LINK </a>`
    });

    function sender() {
        transporter.sendMail(mObj, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    }

    sender()
}

module.exports = mongoConnectService;