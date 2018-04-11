function registerRoute() {
    return app.route('/register')
        .get((req, res) => {
            res.render('main', {
                route: 'register.ejs',
                title: 'Regiset'
            })
        })
        .post((req, res) => {
            function utilsDB(user) {
                var email = user.body.email,
                    password = user.body.password;
                /*DB MONGO */
                mongoose.connect('mongodb://localhost/' + userDB);
                var db = mongoose.connection;
                db.on('error', function () {
                    console.error('Trouble error');
                })
                db.once('open', function () {
                    console.log('Open DB!');
                    var UserDoc = mongoose.model(userModel, userSchema);
                    var user = new UserDoc({
                        email: email,
                        password: password
                    });
                    UserDoc.find({email: email}, function (err, doc) {
                        if (err) {
                            logger.error(err.errmsg)
                        }
                        else {
                            if (!!doc.length) {
                                res.send('error');
                            }
                            else {
                                user.save((err, data) => {
                                    if (err) {
                                        logger.error(err.errmsg);
                                    } else {
                                        res.send('confirm')
                                    }
                                });
                            }
                        }
                    });
                    console.log('Connection end')
                })
            }

            utilsDB(req)
        });
}
module.exports.registerRoute = registerRoute();