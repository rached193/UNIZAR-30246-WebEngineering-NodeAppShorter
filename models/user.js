var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userAccountSchema = new Schema({
    user: {type: String}
    , pass: String
    , token: String
    , session: Date
});

exports.UserAccount = mongoose.model('UserAccount', userAccountSchema);