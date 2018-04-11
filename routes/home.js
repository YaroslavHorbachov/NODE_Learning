function homeRoute() {
    return app.get('/home', (req, res) => {
        res.render('main', {
            route: 'home.ejs',
            title: 'Home'
        })
    });
}
module.exports.homeRoute = homeRoute();