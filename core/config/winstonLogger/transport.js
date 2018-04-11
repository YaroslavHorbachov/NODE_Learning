var fs = require('fs');
var logDir = 'log';
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

var dailyRotate = require('winston-daily-rotate-file');
var transport = new dailyRotate({
    filename: logDir + '/%DATE%.app.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '30m',
    maxFiles: '30d'
});
module.exports.transport = transport;