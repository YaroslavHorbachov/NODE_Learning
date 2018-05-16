const co = require('co');

function dispatch(req, res, cb) {
    co(cb(req)).then(data => res.send(data))
}


module.exports = dispatch;

