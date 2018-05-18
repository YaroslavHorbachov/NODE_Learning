const co = require('co');

function dispatch(req, res, cb) {
    co(cb(req)).then(data => {
        return res.send(data)
    })
}


module.exports = dispatch;

