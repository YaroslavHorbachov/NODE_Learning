const nconf = require('nconf');
nconf.argv().env();
nconf.get('NODE_ENV') === 'production' ? nconf.file('./core/config/prod.json') : nconf.file('./core/config/dev.json');
const userDB = nconf.get('DBNAME');
const userModel = nconf.get('DBMODEL');
module.exports = {
    nconf,
    userDB,
    userModel
};
