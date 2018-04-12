function mongoConnectService(res, model, user) {
    model.find({email: user.email}, function (err, doc) {
        if (err) {
            logger.error(err.errmsg)
        }
        else {
            if (!!doc.length) {
                res.send('error');
            }
            else {
                user.save((err) => {
                    if (err) {
                        logger.error(err.errmsg);
                    } else {
                        res.send('confirm')
                    }
                });
            }
        }
    })
}

module.exports = mongoConnectService;