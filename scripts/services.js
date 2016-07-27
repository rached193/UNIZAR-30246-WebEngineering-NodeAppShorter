var Schemas = require('../models/shortUrl');
var scrape = require('html-metadata');


exports.crearUrlShort = function (params, res) {


    Schemas.ShortUrl.findOne({long: params.URI}, function (err, data) {
        if (err) return console.error(err);
        if (data) {
            res(data.short); //send data
        } else {
            retriveMetaData(params.URI);

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

function retriveMetaData(url) {

    scrape(url, function (error, metadata) {
        var general = metadata.general;
        var descripcion = general.description;
        var title = general.title;
        var arrayDdescripcion = stopwords(descripcion.split(' '));
        var arrayTitle = stopwords(title.split(' '));

        console.log(metadata);
        console.log(arrayDdescripcion);
        console.log(arrayTitle);
    });
}

function stopwords(array){
    return array;
}

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
