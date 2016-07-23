var Schemas = require('../models/shortUrl');


exports.crearUrlShort = function (params, res) {


    Schemas.ShortUrl.findOne({long: params.URI}, function (err, data) {
        if (err) return console.error(err);
        if (data) {
            res(data.short); //send data
        } else {
            generateShortUrl(function (short) {
                var data = new Schemas.ShortUrl({
                    short: short
                    , long: params.URI
                    , user: 'Anom'
                });

                data.save(function (err, data) {
                    if (err) return console.error(err);
                    res(short); //send data
                });
            });
        }
    });


};

function generateShortUrl(callback) {
    var corta = Math.random().toString(36).slice(2);
    Schemas.ShortUrl.findOne({short: corta}, function (err, data) {
        if (err) return console.error(err);
        if (data) {
            generateShortUrl(callback);
        } else {
            callback(corta);
        }
    });

}
