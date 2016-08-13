var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userAccountSchema = new Schema({
    user: {type: String}
    , pass: String
    , user: String
});

exports.UserAccount = mongoose.model('UserAccount', userAccountSchema);