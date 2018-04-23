
/*
var path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    ejs = require('ejs'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    passport = require('passport');
*/

// mongoose.connect('mongodb://localhost/' + global.userDB);
// const db = mongoose.connection;
/*SAVE GLOBAL VARIABLES */
Object.assign(global, require('./core/globals'));

var express = require("express");

var ejs = require("ejs")
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
const MongoStore = require("connect-mongo")(session);

require("./core/globals");
var db = require("./core/db");
var passport = require("./core/passport");




app.set('view engine','ejs')
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: "secret",
        store: new MongoStore({
            mongooseConnection: db()
        })
    })
);
app.use(passport.initialize());
app.use(passport.session());

/*
app.use(function(request, response, next){
    LOGGER.info({
        message: `TIME:${new Date().toLocaleDateString('eu',{ hour: 'numeric', minute: 'numeric', second: 'numeric'})} METHOD:${request.method} PROTOCOL:${request.protocol} URL:${request.url} USER_AGENT:${request.get('User-Agent')}`
    });
    next();
});
*/

app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "http://localhost:4200");
    response.header("Access-Control-Allow-Credentials", true);
    response.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    response.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});


/*



/!* CONFIG APP EXPRESS *!/
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat'
}));
app.use(passport.initialize());
app.use(passport.session());
// app.use(app.router);
// require('./core/passport');
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

*/

/* ROUTES */
const routes = require('./routes/index');
for (let route in routes) {
    routes[route]();
}

app.listen(3020);
console.log('Listen', 3020);