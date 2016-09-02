var service = require('./services');

exports.statistics = function (req, res) {


    req.params.password = " ";
    if (req.body.password) req.params.password = req.body.password;

    req.params.username = req.body.username;
    req.params.token = req.body.token;

    service.statistics(req.params, res);
};
