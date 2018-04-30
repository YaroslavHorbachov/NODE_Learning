/* SAVE GLOBAL VARIABLES */
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
const passport = require("./core/passport");



global.app.set('view engine','ejs');

/* PARSERS */
global.app.use(express.static(path.join(__dirname, "public")));
global.app.use(cookieParser());
global.app.use(bodyParser.json());


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

/* CORS */

global.app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "http://localhost:4200");
    response.header("Access-Control-Allow-Credentials", true);
    response.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    response.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

/* ROUTES */
require('./routes/index')();
/* RUN SERVER */
global.app.listen(3020);
console.log('Listen', 3020);