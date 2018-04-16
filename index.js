/* MODULE IMPORTS */
var path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    ejs = require('ejs'),
    passport = require('passport');

/*SAVE GLOBAL VARIABLES */
Object.assign(global, require('./core/globals'));

/* CONFIG APP EXPRESS */
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

/* ROUTES */
const routes = require('./routes/index');
for (let route in routes) {
    routes[route]();
}

app.listen(3020);
console.log('Listen', 3020);
