var Schemas = require('../../models/shortUrl');
var Promise = require('promise');
var _ = require('lodash');


exports.registryUser = function (params, res) {

    var promise = new Promise(function (resolve, reject) {
        Schemas.UserAccount.findOne({user: params.user}, function (err, data) {
            if (err) reject(err);
            else resolve(data);
        });
    });

    promise.then(function (data) {
        if (data) {
            res(data.short)
        } else {

            var info = new Schemas.UserAccount({
                user: params.user
                , pass: params.pass
            });

            info.save(function (err, out) {
                if (err) return console.error(err);
                res(out); //send data
            });
        }
    });
};


exports.autenticateUser = function (params, res) {
    var promise = new Promise(function (resolve, reject) {
        Schemas.UserAccount.find({user: params.user}, function (err, data) {
            if (err) reject(err);
            else resolve(data); // Pass
        });
    });

    promise.then(function (data) {
        if (data) res(data);
        else res([]);
    });
};