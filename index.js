/* MODULE IMPORTS */
var path = require('path'),
    express = require('express'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    ejs = require('ejs'),
    winston = require('winston'),
    transport = require('./config/winstonLogger/transport').transport,
    mongoose = require('mongoose'),
    loggerMiddleware = require('./config/mdconfig/logger').middlewareLogger;
global.nconf = require('./config/nconf/nconf');


/* CONFIG APP EXPRESS */
var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


app.set('views', path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


var logDir = 'log';
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}


const logger = new winston.createLogger({
    transports: [transport]
});


/* MONGO CONFIG */

var Schema = mongoose.Schema;

var userSchema = new Schema(
    {email: String, password: String},
    {versionKey: false}
);

var userDB = nconf.get('DBNAME');
var userModel = nconf.get('DBMODEL');


/* MIDDLEWARE */
app.use(function (request, response, next) {
    var data = loggerMiddleware(request, response)
    if (data === 'false') {
        next();
    }
    else {
        logger.info(data + "\n");
        next();
    }
});

/* ROUTES */
app.get('/', (req, res) => {
    res.render('main', {
        route: 'index.ejs',
        title: 'Start Page',

        register: 'REGISTER',
        login: 'LOGIN',
        home: 'HOME'
    })
});

app.route('/register')
    .get((req, res) => {
        res.render('main', {
            route: 'register.ejs',
            title: 'Regiset'
        })
    })
    .post((req, res) => {
        function utilsDB(user) {
            var email = user.body.email,
                password = user.body.password;
            /*DB MONGO */
            mongoose.connect('mongodb://localhost/' + userDB);
            var db = mongoose.connection;
            db.on('error', function () {
                console.error('Trouble error');
            })
            db.once('open', function () {
                console.log('Open DB!');
                var UserDoc = mongoose.model(userModel, userSchema);
                var user = new UserDoc({
                    email: email,
                    password: password
                });
                UserDoc.find({email: email}, function (err, doc) {
                    if (err) {
                        logger.error(err.errmsg)
                    }
                    else {
                        if (!!doc.length) {
                            res.send('error');
                        }
                        else {
                            user.save((err, data) => {
                                if (err) {
                                    logger.error(err.errmsg);
                                } else {
                                    res.send('confirm')
                                }
                            });
                        }
                    }
                });
                console.log('Connection end')
            })
        }

        utilsDB(req)
    });

app.get('/log', (req, res) => {
    var resultPath = './log/result.log';
    fs.readdir('./log', (err, data) => {
        if (err) {
            res.end(null, 'utf8')
        }
        var resultString = '';
        var target = data.filter(data => data.split('.')[0].length === 10).slice(-3);
        target.forEach(file => {
            console.log('./log/' + file);
            var files = fs.readFileSync('./log/' + file, 'utf8');
            resultString += files;
        })
        fs.writeFile(resultPath, resultString, 'utf8', (err) => {
            if (err) {
                res.end(null, 'utf8')
            }
        });
        fs.readFile(resultPath, (err, data) => {
            if (err) {
                logger.error(err.errmsg);
                res.end(err, 'utf8');
            }
            res.end(data, 'utf8')
        });
        console.log('Ready for reading, all logs ion .log/result.log')

    })
});
app.get('/home', (req, res) => {
    res.render('main', {
        route: 'home.ejs',
        title: 'Home'
    })
});

app.get('/login', (req, res) => {
    res.redirect('/register')
});

app.get('/404', (req, res) => {
    res.render('main', {
        route: '404.ejs',
        title: 'Home'
    })
});
app.get('/*', (req, res) => {
    res.redirect('/404')
});
app.listen(nconf.get('PORT'));
console.log(nconf.get('PORT'));
