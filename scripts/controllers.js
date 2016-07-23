var mongoose = require('mongoose');
var service = require('./services');

exports.crearUrlShort = function (req,res) {

    service.crearUrlShort(req.params, function (info) {
        res.send({shorUrl:info});
    });



};