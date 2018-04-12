/* MODULE IMPORTS */
var path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    ejs = require('ejs');

/*SAVE GLOBAL VARIABLES */
Object.assign(global, require('./core/globals'));

/* CONFIG APP EXPRESS */
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

/* ROUTES */
const routes = require('./routes/index');
for (let route in routes) {
    routes[route]();
}

app.listen(3020);
console.log('Listen', 3020);
