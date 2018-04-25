const LoggerController = require('../controllers/logger.controller');

function log() {
    app.get('/log', (req, res) => {
        console.log(req.session);
        LoggerController(res)
    });
}
module.exports = log;
