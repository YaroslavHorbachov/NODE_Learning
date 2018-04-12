const fs = require('fs');

function log() {
    app.get('/log', (req, res) => {
        var resultPath = './log/result.log';
        fs.readdir('./log', (err, data) => {
            if (err) {
                res.end(null, 'utf8')
            }
            var resultString = '';
            var target = data.filter(data => data.split('.')[0].length === 10).slice(-3);
            target.forEach(file => {
                console.log('./log/' + file);
                resultString += fs.readFileSync('./log/' + file, 'utf8');
            })
            fs.writeFile(resultPath, resultString, 'utf8', (err) => {
                if (err) {
                    res.end(null, 'utf8')
                }
            });
            fs.readFile(resultPath, (err, data) => {
                if (err) {
                    logger.error(err.errmsg);
                    res.end(err, 'utf8');
                }
                res.end(data, 'utf8')
            });
            console.log('Ready for reading, all logs ion .log/result.log')
        })
    });
}

module.exports = log;