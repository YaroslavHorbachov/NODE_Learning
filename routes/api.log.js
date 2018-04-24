const fs = require('fs');

function log() {
    app.get('/log', (req, res) => {
        console.log(req.session)
        var resultPath = './log/result.log';
        new Promise((res,rej) =>{
            fs.readdir('./log',(err,data) =>{
                if(err) {
                    rej(err)
                } else {
                    const resultArray = [];
                    var target = data.filter(data => data.split('.')[0].length === 10).slice(-3);
                    target.forEach(file => resultArray.push(fs.readFile('./log/' + file, 'utf8',(err, data) => {
                        res(data)
                    } )));
                    return Promise.all(resultArray)
                }
            })
        }).then(resultArray => {
            res.send(JSON.stringify(resultArray));
            console.log('JSON successfully send')
        })
    });
}

module.exports = log;

/*fs.readdir('./log', (err, data) => {
            if (err) {
                res.send(null)
            }
            var resultString = '';
            var target = data.filter(data => data.split('.')[0].length === 10).slice(-3);
            target.forEach(file => {
                console.log('./log/' + file);

            })
            fs.writeFile(resultPath, resultString, 'utf8', (err) => {
                if (err) {
                    res.send(null)
                }
            });
            fs.readFile(resultPath, 'utf8', (err, data) => {
                if (err) {
                    logger.error(err.errmsg);
                    res.send(err);
                }
                res.end(JSON.stringify(data))
            });
            console.log('Ready for reading, all logs ion .log/result.log')
        })*/