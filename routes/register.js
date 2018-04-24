const controllerDB = require('../controllers/mongoConect.controller');
function register() {
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



module.exports = register;