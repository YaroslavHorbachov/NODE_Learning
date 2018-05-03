const nanoid = require('nanoid');
const bcrypt = require('bcryptjs');
const UserDoc = require('../models/user').UserDoc;
const transport = require('../core/nodemailer').transporter;
const createMessage = require('../core/nodemailer').createMessage

function resetPasswordController(req, res) {
    const userEmail = req.body.email;
    UserDoc.findOne({email: userEmail}).then(data => {
        if (data) {
            const newPass = nanoid()
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newPass, salt, (err, hash) => {
                    data.password = hash;
                    const message = crMessage(userEmail, `<p>This is new Password <b>${newPass}</b></p>`);
                    console.log('Console.log message ',message);
                    transport
                        .sendMail(message)
                        .then(info => {
                            console.log(info)
                        })
                        .catch(err => console.log('Error when send ', err));
                    data.save()
                        .then(() => {
                            res.send({name: data.fname, surname: data.lname});
                            console.log('Successfully reset')
                        })

                });
            });
        }
    }).catch(err => {
        console.error(err)
    })
}

const crMessage = (to, html) => {
    return createMessage({to, html})
};
module.exports = resetPasswordController;