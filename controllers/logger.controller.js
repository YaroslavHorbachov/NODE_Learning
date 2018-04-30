const fs = require('fs');
class LoggerController {
    static logger(res){
        new Promise((res,rej) =>{
            fs.readdir('./log',(err,data) =>{
                if(err) {
                    rej(err)
                } else {
                    const resultArray = [];
                    const target = data.filter(data => data.split('.')[0].length === 10).slice(-3);
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
    }
}

module.exports = LoggerController.logger;