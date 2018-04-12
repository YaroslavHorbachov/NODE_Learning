const controllerDB = require('../controllers/mongoConect.controller')
const bodyParser = require('body-parser');


function register() {
    app.use('/register', bodyParser.urlencoded({extended: false}));

    app.get('/register', (req, res) => {
        res.render('main', {
            route: 'register.ejs',
            title: 'Register'
        })
    });
    app.post('/register', (req, res) => {
        controllerDB(req, res);
    });


}

module.exports = register