const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongoLogin = require('./../controllers/mongoLogin.controller'),
    User = require('./../models/user').UserDoc,
    bcrypt = require('bcryptjs');


passport.use(new LocalStrategy(
    function (user, pass, done) {
        User.findOne({email: user}, (err, doc) => {
            console.log('This doc', doc);

        })
        done(null, {user: 'Dmitrik'})
    }
));

passport.serializeUser(function (user, done) {
    console.log('This Serialise user', user);
    done(null, user.user);
});

passport.deserializeUser(function (user, done) {
    console.log('This DESerialise user');
    done(null, user)

});
module.exports = passport;