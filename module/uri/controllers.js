var service = require('./services');

/**
 *  Crea una URL acortada
 */
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

    if (req.query.private) {
        if (!req.body.token) throw new Error('Falta identifacion de Usuario');
        req.params.username = req.body.username;
        req.params.token = req.body.token;
        req.params.password = " ";
        if (req.body.password) req.params.password = req.body.password;

        service.crearPrvateUrl(req.params, res);

    } else {

        service.crearUrlShort(req.params, resolve);

    }


};

/**
 * Devuelve las URI acortadas que cumplan con los criterios de busqueda
 */
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

/**
 * Recupera una URI public
 */
exports.fetchShort = function (req, res) {


    function resolve(info) {
        res.send({URI: info.long});
    }

    service.fetchUrl(req.params, resolve);
};

/**
 * Recupera una URI privada
 */
exports.fetchPrivate = function (req, res) {


    req.params.password = " ";
    if (req.body.password) req.params.password = req.body.password;

    function resolve(info) {
        res.send();
    }

    service.fetchPrivate(req.params, res);
};


/**
 * Recupera una
 */
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

