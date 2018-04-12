const mongoose = require('mongoose');

function DBConnection() {
    mongoose.connect('mongodb://localhost/' + global.userDB);
    return mongoose.connection;
}

module.exports = DBConnection;