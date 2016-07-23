var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var shortUrlSchema = new Schema({
    title: { type: String }
    , rating: String
    , releaseYear: Number
    , hasCreditCookie: Boolean
});

exports.Movie =  mongoose.model('NotMovie', shortUrlSchema);
