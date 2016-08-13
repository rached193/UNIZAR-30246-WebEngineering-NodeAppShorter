var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userAccountSchema = new Schema({
    user: {type: String}
    , pass: String
});

exports.UserAccount = mongoose.model('UserAccount', userAccountSchema);