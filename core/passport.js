const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongoLogin = require('./../controllers/mongoLogin.controller');


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
},
    (username, password, done) => {
        const [email, pass] = [username,password];
        console.log('This data : - ', email,  pass );
        mongoLogin(email,pass,done)
    },
    (req,res) =>{
        console.log('This user', req.user);
        res.send(JSON.stringify(req.user));
    }
));
passport.serializeUser(function(user, done) {
    console.log('This user', user);
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        err
            ? done(err)
            : done(null,user);
    });
});
module.exports = passport;