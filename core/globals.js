const nconfModule = require('./config/nconf');
var obj = {...{app: require('express')()}, ...{...nconfModule}};
module.exports = obj;
