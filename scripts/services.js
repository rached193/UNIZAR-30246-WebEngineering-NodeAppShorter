var Schemas = require('../models/shortUrl');
var scrape = require('html-metadata');
var Promise = require('promise');
var _ = require('lodash');

exports.crearUrlShort = function (params, res) {

    retriveMetaData(params.URI);

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
            new Promise(function (resolve, reject) {
                generateShortUrl(resolve);
            }).then(function (data) {
                scrape(params.URI, function (error, metadata) {
                    if (error) { //Error, si no es una url valida
                        res(error);
                    } else {
                        var general = metadata.general;
                        var descripcion = general.description;
                        var title = general.title;
                        var arrayDdescripcion = stopwords(descripcion.split(' '));
                        var arrayTitle = stopwords(title.split(' '));


                        var info = new Schemas.ShortUrl({
                            short: data
                            , long: params.URI
                            , user: 'Anom'
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

function retriveMetaData(url) {

    scrape("http://" + url, function (error, metadata) {
        if (error) {
            console.log(error);
        } else {


            var general = metadata.general;
            var descripcion = general.description;
            var title = general.title;
            var arrayDdescripcion = stopwords(descripcion.split(' '));
            var arrayTitle = stopwords(title.split(' '));

            console.log(arrayDdescripcion);
            console.log(arrayTitle);
        }
    });
}

function stopwords(array) {
    var dic = ['y', ',', 'las', 'en', '-','ultimas'];
    var nArray = [];
    _.forEach(array, function (item) {
        console.log(item);
       var found = _.findIndex(dic,function(o) { return o == item.toLowerCase();});
        console.log(found);
        if(found==-1){
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
