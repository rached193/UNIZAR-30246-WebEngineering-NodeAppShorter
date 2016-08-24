var service = require('./services');

exports.registryUser = function (req, res) {

    if (!req.body.username)  throw new Error('something bad happened');

    service.registryUser(req.body, res);

};

exports.autenticateUser = function (req, res) {


    service.autenticateUser(req.body, res);
};