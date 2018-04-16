const bodyParser = require('body-parser'),
    mongoLogin = require('../controllers/mongoLogin.controller'),
    passport = require('passport'),
    User = require('../models/user').UserDoc,
    LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
        usernameFiled: 'email',
        passwordFiled: 'password'
    },
    function (username, password, done) {
        console.log(username, password);
        done(null, false, {message: 'Fuck you'})

    }
));
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err,user){
        err
            ? done(err)
            : done(null,user);
    });
});
function login() {
    app.post('/login',
        passport.authenticate('local',
            {
                successRedirect: '/',
                failureRedirect: '/login',
            })
    )
}


/*
app.post('/login', bodyParser.json(), (req, res) => {
    console.log('Request on login', req.body);
    const data = {state: 'Done'};
    mongoLogin(req, res);
    // res.send(JSON.stringify(data));
});
*/


module.exports = login;


/* BACKUP */
/*

const bodyParser = require('body-parser'),
    mongoLogin = require('../controllers/mongoLogin.controller'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;


function login() {
    app.post('/login', bodyParser.json(), (req, res) => {
        console.log('Request on login', req.body);
        const data = {state: 'Done'};
        mongoLogin(req, res);
        // res.send(JSON.stringify(data));
    });

}

module.exports = login;


*/