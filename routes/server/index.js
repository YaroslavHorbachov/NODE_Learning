const express = require('express');
const router = express.Router();
const passport = require('passport');
const controllerDB = require('../../controllers/mongoConect.controller');

router.get('/login/auth/facebook',
    passport.authenticate('facebook',
        {scope: ['email', 'public_profile']}),
    (req, res) => {
        res.redirect('http://localhost:4200/login')
    });
router.get('/login/auth/google',
    passport.authenticate('google'),
    (req, res) => {
        res.redirect('http://localhost:4200/login')
    });
router.get('/login/facebook',
    passport.authenticate('facebook',
        {scope: ["public_profile", "user_birthday"]})
);
router.get('/login/google',
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/plus.login'],
    })
);
router.get('/logout', function (req, res) {
    console.log('Logout here');
    req.logout();
    res.send(JSON.stringify({status: "Log OUT"}));
});
router.get('/register', (req, res) => {
    res.render('main', {
        route: 'register.ejs',
        title: 'Register'
    })
});
router.get('/user/test', (req, res) => {
    console.log('Test place', req.user);
    res.send(JSON.stringify(req.user))
});
router.get('/user/logout', (req, res) => {
    console.log('Test logout');
    req.logout();
    res.send(JSON.stringify({status: "Log Out"}))
});
router.post('/register', (req, res) => {
    controllerDB(req, res);
});
router.post('/login',
    passport.authenticate('local'),
    (req, res) => {
        console.log('After passport ', req.user);
        res.send(req.user)
    }
);
module.exports = router;
