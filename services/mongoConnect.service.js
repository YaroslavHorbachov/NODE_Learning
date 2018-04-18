function mongoConnectService(res, model, user) {
    model.find({email: user.email}, function (err, doc) {
        if (err) {
            logger.error(err.errmsg)
        }
        else {
            console.log('Data', doc);
            if (doc.length > 0) {
                res.send(JSON.stringify({...user, state:'error'}));
            }
            else {
                user.save((err) => {
                    if (err) {
                        logger.error(err.errmsg);
                    } else {
                        res.send(JSON.stringify({...user._doc, state:'done'}))
                    }
                });
            }
        }
    })
}

module.exports = mongoConnectService;