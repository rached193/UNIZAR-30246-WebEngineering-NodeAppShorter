var service = require('./services');

exports.crearUrlShort = function (req, res) {

    if (!req.query.URI)  throw new Error('Es necesario el campo URI');
    req.params.URI = req.query.URI;

    console.log(req.body);

    if (req.query.tags) {
        req.params.tags = req.query.tags;
    } else {
        req.params.tags = "";
    }

    function resolve(info) {
        res.send({"shortUrl": info});
    }

    if (req.query.private) {
        res.sendStatus(202);
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

exports.fetchShort = function (req, res) {


    function resolve(info) {
        res.send({URI: info.long});
    }

    service.fetchUrl(req.params, resolve);
};


exports.fetchUrlInfo = function (req, res) {



    function resolve(info) {
        console.log(info);
        res.send({info: [info.title, info.description, info.tags]});
    }

    service.fetchUrl(req.params, resolve);
};


exports.pruebas = function (req, res) {
    res.send();
};

