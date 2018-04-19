const fs = require('fs');
const multer = require('multer')

const Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        console.log('This place dist');
        callback(null, "public/images/");
    },
    filename: function(req, file, callback) {
        console.log(file)
        callback(null, 'avatar' + "_" + Date.now() + '.jpg' );
    }
});
const upload = multer({
    storage: Storage
}).array("myfile", 3);

function change() {

    app.post('/api/change', (req, res) => {
        console.log(req.user, req.isAuthenticated());
        upload(req, res, (err) =>{
            if (err) {
                console.log('Here ', err)
            } else {
                console.log('Image done')
            }
        });
        /*fs.writeFile('public/images/avatars/' + (new Date()).getMilliseconds().toString()+ '.img',dString.toString('base64'), err => {
            if (err) {
                console.log('Write files ', err)
            } else {
                console.log('file Success')
            }
        })*/

        res.send(JSON.stringify({file: req.files}))
    }
)

}


module.exports = change;