var Promise = require('promise');
var _ = require('lodash');
var Schemas = require('../../models/shortUrl');

exports.statistics = function (params, res) {


    var promise = new Promise(function (resolve, reject) {
        Schemas.ShortUrl.find({}, {}, function (err, data) {
            if (err) reject(err);
            else resolve(data);
        });
    });
    promise.then(function (data) {
        if (data) {

            var dataSeries = [];
            var info = _.groupBy(data, 'user');
            _.map(info, function (usuario, key) {
                var total = 0;
                _.map(usuario, function (item) {
                    total += +item.statistics[params.field];
                });

                var obj = {
                    user: key,
                    field: params.field,
                    fieldValue: total
                };
                dataSeries.push(obj);

            });
            res.send(dataSeries);
        }
        else {
            res.send([]);
        }
    });
};