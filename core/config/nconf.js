var nconf = require('nconf');
nconf.argv().env().file('./config/config.json');
nconf.get('NODE_ENV') === 'production' ? nconf.file('./config/prod.json') : nconf.file('./config/dev.json');
module.exports = nconf;