var Schemas = require('../models/shortUrl');
var scrape = require('html-metadata');
var Promise = require('promise');

exports.pruebas = function (params, res) {

    var promise = new Promise(function (resolve, reject) {
        Schemas.ShortUrl.findOne({long: params.URI}, function (err, data) {
            if (err) reject(err);
            else resolve(data);
        });
    });

    promise.then(function (data){
        if(data)  res(data.short);

            var short = generateShortUrl();
        console.log(short);
        res(short);


    });

};

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

function stopwords(array) {
    return array;
}

function generateShortUrl() {

    var corta = Math.random().toString(36).slice(2);
    var promise = new Promise(function (resolve, reject) {
        Schemas.ShortUrl.findOne({short: corta}, function (err, data) {
            if (err) reject(err);
            else resolve(data);
        });
    });

    promise.then(function (data){
        if(data)  return generateShortUrl();
        console.log(corta);
        return corta;
    });
}
