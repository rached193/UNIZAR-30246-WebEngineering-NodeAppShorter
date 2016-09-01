var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var shortUrlSchema = new Schema({
    short: {type: String}
    , long: String
    , user: String
    , description: [String]
    , title: [String]
    , tags: [String]
    , statistics: {
        click: {type: Number, default: 0}
        , search: {type: Number, default: 0}
        , create: {type: Number, default: 0}

    }
});
exports.ShortUrl = mongoose.model('ShortUrl', shortUrlSchema);

var privateUrlSchema = new Schema({
    short: {type: String}
    , long: String
    , user: String
    , tags: [String]
    , password: String
    , share: [String]
    , caducidad: Date
});
exports.PrivateUrl = mongoose.model('PrivateUrl', privateUrlSchema);