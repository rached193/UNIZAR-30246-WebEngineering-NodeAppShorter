var mongoose = require('mongoose');
var service = require('./services');
var http = require('http');

exports.crearUrlShort = function (req, res) {

    if (!req.query.URI) {
        //error
    }
    req.params.URI = req.query.URI;
    service.crearUrlShort(req.params, function (info) {
        res.send({shorUrl: info});
    });
};

exports.findUrlShort = function (req, res) {

    if(!req.query.description && !req.query.title){
        //error
    }

    if (req.query.description) {
        req.params.description =  req.query.description;
    }

    if (req.query.title) {
        req.params.title =  req.query.title;
    }


    service.findUrlShort(req.params, function (info) {
        res.send({url: info});
    });
};

exports.fetchUrl = function (req, res) {
    if (!req.query.INFO) {
        //error
    }
    req.params.INFO = req.query.INFO;

    service.fetchUrl(req.params, function (info) {
        res.send({shorUrl: info});
    });
};

exports.pruebas = function (req, res) {


    res.send();
};

