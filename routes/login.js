const bodyParser = require('body-parser'),
    mongoLogin = require('../controllers/mongoLogin.controller'),

    passport = require('passport'),

    User = require('../models/user').UserDoc,


    LocalStrategy = require('passport-local').Strategy;


require('./../core/passport');


function login() {
    app.post('/login',
        passport.authenticate('local'),
        (req, res) => {
            console.log('user request', req.user);
            res.send(JSON.stringify(req.user))
        }
    )
    app.get('/login', (req, res) => {
        console.log('Done Login', req.isAuthenticated());
    })
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