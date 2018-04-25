const loggerMiddleware = require('../../core/config/utils/logger'),
    logger = require('../../core/logger');

function other() {
    app.get('/*', (req, res) => {
        logger.error(loggerMiddleware(req, res));
        res.render('main', {
            title: 'Not Found',
            route: '404.ejs'
        })
    });
}

module.exports = other;