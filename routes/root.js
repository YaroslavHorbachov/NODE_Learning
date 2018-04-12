function root() {
    app.get('/', (req, res) => {
        res.render('main', {
            route: 'index.ejs',
            title: 'Start Page',

            register: 'REGISTER',
            login: 'LOGIN',
            home: 'HOME'
        })
    });

}

module.exports = root;