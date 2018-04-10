/* MODULE IMPORTS */
var path = require('path'),
    express = require('express'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    ejs = require('ejs'),
    nconf = require('nconf'),
    winston = require('winston'),
    dailyRotate = require('winston-daily-rotate-file'),
    mongoose = require('mongoose');


/* CONFIG APP EXPRESS */
var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.set('views', path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


/* EJS SYNTAX TREE */

var objIndex = {
    register: 'REGISTER',
    login: 'LOGIN',
    home: 'HOME'
};
var objHome = {
    home: 'HOME'
};



// Create the log directory if it does not exist
var env = nconf.get('NODE_ENV');
var logDir = 'log';
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}
var transport = new dailyRotate({
    filename: logDir + '/%DATE%.app.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '30m',
    maxFiles: '30d' })

transport.on('rotate', (oldF,newF)=>{
    console.log(newF, newF)
})

const logger = new winston.createLogger({
    transports: [ transport ]
});

nconf.argv().env().file('./config/config.json');

nconf.get('NODE_ENV') == 'production' ? nconf.file('./config/prod.json') : nconf.file('./config/dev.json');
logger.info(nconf.get('PORT'));

var port = null;
var data = null;

/* FUNCTION WHO GET DATA FROM CONFIG */

// console.log('Procees env ', process.env);

function getConfigData(err, content) {
    if (err) {
        console.log(err);
        return null;
    } else {
        data = JSON.parse(content);
        if (data['PORT']) {
            port = data['PORT']
        } else {
            throw new Error('Config file without PORT setting')
        }
    }
}

/* MONGO CONFIG */

var Schema = mongoose.Schema;

var userSchema = new Schema(
    {
        email: String,
        password: String
    },
    {versionKey: false}
)

var userDB = 'NODETEST';
var userModel = 'USERS';

/* ROUTES */
app.use(function (request, response, next) {
    var now = new Date();
    var hour = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var miliseconds = now.getMilliseconds();
    var data =
        'Time: ' + hour + ':' + minutes + ':' + seconds + ':' + miliseconds + '; '
        + 'Method: ' + request.method + '; '
        + 'URl: ' + request.url + '; '
        + 'Cookies: keys: ' + Object.keys(request.cookies).join(' ') + ', values: ' + Object.values(request.cookies).join(' ') + ' ' + '; '
        + 'Hostname: ' + request.hostname + '; '
        + 'StatusCode: ' + response.statusCode + '; '
        + 'User agent: ' + request.get('user-agent') + '; ';
    logger.info( data + "\n");
    next();
});
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
    var date = new Date().toLocaleDateString().split('-').map(item => {
        if(item < 10) {return '0'+item}
        else {return item}
    }).join('-');
    fs.readdir('./log',(err, data) => {
        var target = data.filter(data => data.split('.')[0] === date);
        console.log(target)
    } )
    console.log(date);
    fs.readFile('./public/server.log', (err, content) => {
        if (err) {
            winston.error(err.errmsg)
            res.end('Error');
        } else {
            res.end(content, 'utf8');
        }
    })
})

app.get('/home', (req, res) => {
    res.render('main', {
        route: 'home.ejs',
        title: 'Home'
    })
});

app.get('/login', (req, res) => {
    res.redirect('/register')
});

app.get('/*', (req, res) => {
    res.render('main', {
        route: '404.ejs',
        title: 'Home'
    })
});
app.listen(nconf.get('PORT'));
console.log(nconf.get('PORT'))
