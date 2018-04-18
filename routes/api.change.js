const fs = require('fs');
var multer = require('multer')
var upload = multer({dest: 'uploads/'})

function change() {
    /*    app.route('/api/change')
            .get((req, res) => {
                console.log(req);
                res.send('Home')
            })*/
    app.post('/api/change', (req, res) => {
        const dString = Buffer.from(req.body.toString());
        fs.writeFile('public/images/avatars/' + (new Date()).getMilliseconds().toString()+ '.img',dString.toString('base64'), err => {
            if (err) {
                console.log('Write files ', err)
            } else {
                console.log('file Success')
            }
        })

        res.send(JSON.stringify({file: dString}))
    }
)

}


module.exports = change;