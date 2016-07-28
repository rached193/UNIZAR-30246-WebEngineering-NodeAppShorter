var mongoose = require('mongoose');
var service = require('./services');
var http = require('http');

exports.crearUrlShort = function (req, res) {

    service.pruebas(req.params, function (info) {
        res.send({shorUrl: info});
    });
};

exports.pruebas = function (req, res) {

    var scrape = require('html-metadata');

    var url = "http://submanga.com/";

    scrape(url, function(error, metadata){
        var general = metadata.general;
        var descripcion = general.description;
        var title = general.title;
        var arrayDdescripcion = descripcion.split(' ');
        var arrayTitle = descripcion.split(' ');

        console.log(metadata);
        console.log(arrayDdescripcion);
        console.log(arrayTitle);
    });
    res.send();
};

function stopwords(array){

}