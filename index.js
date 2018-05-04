/* SAVE GLOBAL VARIABLES */
const {EMAIL, PASSWORD} = require("./core/config/credentials");

Object.assign(global, require('./core/globals'));

/* DEPENDENCIES */
const express = require("express");
const ejs = require("ejs");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
require("./core/globals");
const db = require("./core/db");
// const {transporter, createMessage} = require('./core/nodemailer');
const passport = require("./core/passport");


global.app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "http://localhost:4200");
    response.header("Access-Control-Allow-Credentials", true);
    response.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    response.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

global.app.set('view engine', 'ejs');

/* PARSERS */
global.app.use(express.static(path.join(__dirname, "public")));
global.app.use(cookieParser());
global.app.use(bodyParser.json());

/* SHEDULER */

/* NOTIFICATION */
// require('./core/scheduler')
require('./controllers/review-notification.controller').printAsync()

/* PASSPORT AUTH */
global.app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: "secret",
        store: new MongoStore({
            mongooseConnection: db()
        })
    })
);
global.app.use(passport.initialize());
global.app.use(passport.session());



/* ROUTES */
require('./routes/index')();
/* RUN SERVER */
global.app.listen(3020);
console.log('Listen', 3020);
/*
mailer.extend(global.app, {
    from: 'no-reply@example.com',
    host: 'smtp.gmail.com',
    port: 587,// use SSL
    secure: false, // port for secure SMTP
    auth: {
        user: EMAIL,
        pass: PASSWORD
    }
});

global.app.get('/email', function (req, res, next) {
    global.app.mailer.send('email', {
        to: '1mohame@7uy35p.cf', // REQUIRED. This can be a comma delimited string just like a normal email to field.
        subject: 'Test Email', // REQUIRED.
        otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables.
    }, function (err) {
        if (err) {
            // handle error
            console.log(err);
            res.send('There was an error sending the email');
            return;
        }
        res.send('Email Sent');
    });
});*/
