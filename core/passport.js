const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('./../models/user').UserDoc;



passport.use(new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password"
    },
    function (username, password, done) {
        User.findOne({email: username}, (err, doc) => {
            if (err) {
                console.error('Critical Error with DB', err);
                done(err);
            }
            else {
                if (doc) {
                    done(null, {fname: doc.fname, id: doc._id, status: 'done'})
                } else {
                    done(null, false)
                }
            }

        })
    }
));


passport.serializeUser(function (user, done) {
    console.log('This Serialise user', user.id);
    done(null, user.id);
});


passport.deserializeUser(function (id, done) {

    User.findById(id, (err, doc) => {
        if(err) { console.log('Error', err) ; done(null, false);}
        console.log(`Deserialize user ...`);
        done(null, doc)
    });
});

module.exports = passport;