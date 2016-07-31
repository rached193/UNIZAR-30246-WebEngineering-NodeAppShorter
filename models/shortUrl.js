var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var shortUrlSchema = new Schema({
    short: { type: String }
    , long: String
    , user: String
    , description:[String]
    , title: [String]
});
exports.ShortUrl =  mongoose.model('ShortUrl', shortUrlSchema);
