const db = require('../core/db'),
    UserDoc = require('../models/user').UserDoc,
    bcrypt = require('bcryptjs');

function mongoLogin(email, password, done) {

    db().on('error', function () {
        console.error('Trouble error');
        done(null, false)

    });
    db().once('open', function () {
        console.log('Open DB!');


        UserDoc.find({email: email}, (error, data) => {
            if (error) {
                logger.error(error);
                done(error)
            } else {
                if (data.length > 0) {
                    // console.log('User find', data);
                    bcrypt.compare(password, data[0].password, (err, result) => {
                        if (err) {
                            console.log('Some problem with decrypt ', err);
                            done(error)
                        } else {
                            if (result) {
                                console.log('Result done', result);
                                done(null, {
                                    email: data[0].email,
                                    password: data[0].password,
                                    fname: data[0].fname,
                                    id: data[0]._id
                                })
                            } else {
                                console.log('Error compare');
                                done(error);

                            }
                        }
                    })
                } else {
                    console.log('Not find this register user')
                    done(null, false)
                }
            }
        });


        console.log('Connection end')
    });

}

module.exports = mongoLogin;
