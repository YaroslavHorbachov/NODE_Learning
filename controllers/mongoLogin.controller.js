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
                                    password : data[0].password,
                                    id: data[0]._id
                                })
                                // res.send(JSON.stringify({state: 'done'}))
                            } else {
                                console.log('Error compare')
                                done(error);
                                // res.send(JSON.stringify({state: 'error'}))
                            }
                        }
                    })
                } else {
                    console.log('Not find this register user')
                }
            }
        });


        console.log('Connection end')
    });

}

module.exports = mongoLogin;

/*
passport.use(new LocalStrategy(
    function (username, password, done) {

        UserDoc.find(username, function (err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, {message: 'Unknown User'});
            }

            User.comparePassword(password, user.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Invalid password'});
                }
            });
        });
    }));*/
