/* MODULE IMPORTS */
var path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    ejs = require('ejs'),
    passport = require('passport'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    db = require('./core/db');

/*SAVE GLOBAL VARIABLES */
Object.assign(global, require('./core/globals'));

/* CONFIG APP EXPRESS */
app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "http://localhost:4200");
    response.header("Access-Control-Allow-Credentials", true);
    response.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    response.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, WithCredentials"
    );
    next();
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(cookieParser());
app.use(session({
    key: 'session.sid',
    secret: 'Some secret key',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 600000
    },
    store: new MongoStore({mongooseConnection: db()})
}));
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({extend: false, limit: '100mb'}));

app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
    console.log('Session in middleware', req.user, 'Session express', req.session);
    next();
})
require('./core/passport');
// app.use(app.router);


/* ROUTES */
const routes = require('./routes/index');
for (let route in routes) {
    routes[route]();
}

app.listen(3020);
console.log('Listen', 3020);
