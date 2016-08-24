var service = require('./services');

exports.crearUrlShort = function (req, res) {

    if (!req.query.URI)  throw new Error('Es necesario el campo URI');
    req.params.URI = req.query.URI;

    if (req.query.tags) {
        req.params.tags = req.query.tags;
    } else {
        req.params.tags = "";
    }

    function resolve(info) {
        res.send({"shortUrl": info});
    }

    service.crearUrlShort(req.params, resolve);
};

exports.findUrlShort = function (req, res) {

    if (!req.query.description && !req.query.title) {
        //error
    }

    if (req.query.description) {
        req.params.description = req.query.description;
    }

    if (req.query.title) {
        req.params.title = req.query.title;
    }

    function resolve(info) {
        res.send({url: info});
    }

    service.findUrlShort(req.params, resolve);


};

exports.fetchUrl = function (req, res) {
    if (!req.query.INFO) {
        //error
    }
    req.params.INFO = req.query.INFO;

    function resolve(info) {
        res.send({URI: info});
    }

    service.fetchUrl(req.params, resolve);
};


exports.pruebas = function (req, res) {
    res.send();
};

