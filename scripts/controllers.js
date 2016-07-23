var mongoose = require('mongoose');
var service = require('./services');

exports.crearUrlShort = function (req,res) {
    service.crearUrlShort();
res.send("Probando");

};