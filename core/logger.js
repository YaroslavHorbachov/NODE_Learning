const fs = require('fs');
const winston = require('winston');
const logDir = 'log';
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

var dailyRotate = require('winston-daily-rotate-file');
var loggerRotate = new dailyRotate({
    filename: logDir + '/%DATE%.app.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '30m',
    maxFiles: '30d'
});

const logger = new winston.createLogger({
    transports: [loggerRotate]
});
module.exports = logger;