var service = require('./services');

exports.registryUser = function (req, res) {

    if (!req.body.username)  throw new Error('something bad happened');

    service.registryUser(req.body, resolve);
    function resolve(info) {
        res.send({shorUrl: info});
    }

};

exports.autenticateUser = function (req, res) {

    res.send(req);
};