var Schemas = require('../../models/shortUrl');
var scrape = require('html-metadata');
var Promise = require('promise');
var _ = require('lodash');

exports.crearUrlShort = function (params, res) {


    var promise = new Promise(function (resolve, reject) {
        Schemas.ShortUrl.findOne({long: params.URI}, function (err, data) {
            if (err) reject(err);
            else resolve(data);
        });
    });

    promise.then(function (data) {
        if (data) {
            res(data.short)
        } else {
            var npromise = new Promise(function (resolve, reject) {
                generateShortUrl(resolve);
            });

            npromise.then(function (data) {
                scrape(params.URI, function (error, metadata) {
                    if (error) { //Error, si no es una url valida
                        res(error);
                    } else {
                        var metaInfo = retriveMetaData(metadata);


                        var info = new Schemas.ShortUrl({
                            short: data
                            , long: params.URI
                            , user: 'Anom'
                            , description: metaInfo
                        });

                        info.save(function (err, out) {
                            if (err) return console.error(err);
                            res(out); //send data
                        });
                    }
                });
            });
        }

    });

};

exports.fetchUrl = function (params, res) {


    var promise = new Promise(function (resolve, reject) {
        Schemas.ShortUrl.findOne({short: params.URI}, function (err, data) {
            if (err) reject(err);
            else resolve(data);
        });
    });

    promise.then(function (data) {
        if (data) res(data);
        else res([]);
    });
};

exports.findUrlShort = function (params, res) {
    var args = {};

    if (params.description && params.title) {
        args = {description: params.description, title: params.title}
    } else if (params.description) {
        args = {description: params.description}
    } else if (params.title) {
        args = {title: params.title}
    }

    var promise = new Promise(function (resolve, reject) {
        Schemas.ShortUrl.find(args, function (err, data) {
            if (err) reject(err);
            else resolve(data);
        });
    });

    promise.then(function (data) {
        if (data) res(data);
        else res([]);
    });
};

function retriveMetaData(metadata) {


    var general = metadata.general;
    var descripcion = general.description;
    var title = general.title;
    var arrayDdescripcion = stopwords(descripcion.split(' '));
    var arrayTitle = stopwords(title.split(' '));

    console.log(arrayDdescripcion);
    console.log(arrayTitle);

    return arrayDdescripcion;


}

function stopwords(array) {
    var dic = ['y', ',', 'las', 'en', '-', 'ultimas'];
    var nArray = [];
    _.forEach(array, function (item) {
        console.log(item);
        var found = _.findIndex(dic, function (o) {
            return o == item.toLowerCase();
        });
        console.log(found);
        if (found == -1) {
            nArray.push(item.toLowerCase());
        }
    });
    return nArray;
}


function generateShortUrl(res) {

    var corta = Math.random().toString(36).slice(2);
    var promise = new Promise(function (resolve, reject) {
        Schemas.ShortUrl.findOne({short: corta}, function (err, data) {
            if (err) reject(err);
            else resolve(data);
        });
    });
    promise.then(function (data) {
        if (data)  return generateShortUrl(res);
        else res(corta);
    });
}
