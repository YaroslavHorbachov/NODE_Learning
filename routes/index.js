function deploy(){
    const api = require('./api');
    const server = require('./server');
    app.use('', api);
    app.use('',server);
}
module.exports = deploy;