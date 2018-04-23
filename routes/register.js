const controllerDB = require('../controllers/mongoConect.controller')
const bodyParser = require('body-parser');


function register() {
    app.get('/register', (req, res) => {
        res.render('main', {
            route: 'register.ejs',
            title: 'Register'
        })
    });
    app.post('/register', bodyParser.json(), (req, res) => {
        console.log(req.body);
         controllerDB(req, res);
    });


}

module.exports = register;