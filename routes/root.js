function root() {
    return app.get('/', (req, res) => {
        res.render('main', {
            route: 'index.ejs',
            title: 'Start Page',

            register: 'REGISTER',
            login: 'LOGIN',
            home: 'HOME'
        })
    });
}
module.exports.rootRoute = root();