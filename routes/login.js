const LocalStrategy = require('passport-local').Strategy,
    mongoLogin = require('./../controllers/mongoLogin.controller'),
    User = require('./../models/user').UserDoc,
    passport = require('passport');


function login() {
    app.post('/login',
        passport.authenticate('local'),
        (req, res) => {
            console.log('After passport ', req.session);
            res.send(req.user)
        }
    )
}
/*
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
    console.log('ID', id)
    User.findById(id, (err, doc) => {
        if(err) { console.log('Error', err) ; done(null, false);}
        console.log(doc);
        console.log(`This DeSerialise user $`);
        done(null, doc)
    });
});*/

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