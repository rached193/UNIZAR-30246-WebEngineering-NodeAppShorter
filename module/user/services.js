var Schemas = require('../../models/userAccount');
var Promise = require('promise');
var _ = require('lodash');
var crypto = require('crypto');


exports.registryUser = function (params, res) {

    var promise = new Promise(function (resolve, reject) {
        Schemas.UserAccount.findOne({user: params.username}, function (err, data) {
            if (err) reject(err);
            else resolve(data);
        });
    });

    promise.then(function (data) {
            if (data) {
                res.sendStatus(413);
            } else {
                var info = new Schemas.UserAccount({
                    user: params.username
                    , pass: params.password
                });

                info.save(function (err, out) {
                    if (err) return console.error(err);
                    res.send(out); //send data
                });
            }
        }, function () {
            res.sendStatus(411);
        }
    );
};


exports.autenticateUser = function (params, res) {
    var token = randomValueHex(12);
    var promise = new Promise(function (resolve, reject) {
        Schemas.UserAccount.findOneAndUpdate({
            user: params.username,
            pass: params.password
        }, {token: token}, function (err, data) {
            if (err) reject(err);
            else resolve(data);
        });
    });

    promise.then(function (data) {
        if (data) {
            console.log(token);
            res.send({'token': token});
        }
        res.sendStatus(417);
    });
};


function randomValueHex(len) {
    return crypto.randomBytes(Math.ceil(len / 2))
        .toString('hex') // convert to hexadecimal format
        .slice(0, len);   // return required number of characters
}
