const fs = require('fs'),
multer = require('multer'),
User = require('../models/user').UserDoc;

const Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "public/images/");
    },
    filename: function(req, file, callback) {
        callback(null, 'avatar' + "_" + req.user.id + '.jpg' );
    }
});
const upload = multer({
    storage: Storage
}).array("myfile", 3);

function change() {

    app.post('/api/change', (req, res) => {
        upload(req, res, (err) =>{
            if (err) {
                console.log('Here ', err)
            } else {
                console.log('Image link to write into base');
                User.findById(req.user,
                    (err, doc) => {
                        console.log('This doc before ', doc)
                        if(err) {
                            console.log('Error when searching file ', err)
                        }
                        doc.avatar = 'http://localhost:3020/images/avatar_'+req.user.id+".jpg";
                        doc.save((err)=>{
                            if(err){
                                console.log('When file be upload throw ', err)
                            } else{
                                console.log('This doc after ', doc)
                                console.log('File successfully upload')
                            }
                        });
                    }
                )
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