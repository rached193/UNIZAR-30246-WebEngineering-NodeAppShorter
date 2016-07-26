var mongoose = require('mongoose');
var service = require('./services');
var http = require('http');
var MetaInspector = require('node-metainspector');

exports.crearUrlShort = function (req, res) {

    service.crearUrlShort(req.params, function (info) {
        res.send({shorUrl: info});
    });
};

exports.pruebas = function (req, res) {

    var scrape = require('html-metadata');

    var url = "http://submanga.com/";

    scrape(url, function(error, metadata){
        console.log(metadata);
    });
    res.send();
};