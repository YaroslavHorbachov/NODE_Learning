const multer = require('multer'),
    User = require('../models/user').UserDoc;

const Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "public/images/");
    },
    filename: function (req, file, callback) {
        callback(null, 'avatar' + "_" + req.user.id + '.jpg');
    }
});
const upload = multer({
    storage: Storage
}).array("myfile", 3);


function updateAvatarController(req, res) {
    upload(req, res, (err) => {
        if (err) {
            console.log('Here ', err)
        } else {
            User.findById(req.user,
                (err, doc) => {
                    if (err) {
                        console.log('Error when searching file ', err)
                    }
                    doc.avatar = 'http://localhost:3020/images/avatar_' + req.user.id + ".jpg";
                    doc.save((err) => {
                        if (err) {
                            console.log('When file be upload throw ', err)
                        }
                    });
                }
            )
        }
    });
    res.send(JSON.stringify({file: req.files}))
}

module.exports = updateAvatarController;
