var Schemas = require('../../models/shortUrl');
var Usuario = require('../../models/userAccount');
var scrape = require('html-metadata');
var Promise = require('promise');
var _ = require('lodash');

exports.crearUrlShort = function (params, res) {


    var promise = new Promise(function (resolve, reject) {
        Schemas.ShortUrl.findOneAndUpdate({long: params.URI}, {
                $inc: {'statistics.create': 1}
            },
            function (err, data) {
                if (err) reject(err);
                else resolve(data);
            }
        )
        ;
    });

    promise.then(function (data) {
            if (data) {
                res(data.short)
            } else {
                var npromise = new Promise(function (resolve, reject) {
                    generateShortUrl(resolve);
                });

                npromise.then(function (data) {
                    scrape(params.URI, function (error, metadata) {
                        if (error) { //Error, si no es una url valida
                            res(error);
                        } else {
                            var metaInfo = retriveMetaData(metadata);


                            var info = new Schemas.ShortUrl({
                                short: data
                                , long: params.URI
                                , user: params.username
                                , description: metaInfo[0]
                                , title: metaInfo[1]
                                , tags: params.tags
                                , statistics: {
                                    click: 0
                                    , search: 0
                                }
                            });

                            info.save(function (err, out) {
                                if (err) return console.error(err);
                                res(out.short); //send data
                            });
                        }
                    });
                });
            }

        }, function (err) {
            console.log(err);
        //res.sendStatus(412);
        }
    );

};

exports.crearPrvateUrl = function (params, res) {

    var promise = new Promise(function (resolve, reject) {
        Schemas.PrivateUrl.find({long: params.URI}, function (err, data) {
            if (err) reject(err);
            else resolve(data);
        });
    });

    promise.then(function (data) {
            if (data) {
                res.send({"shortUrl": data.short}); //send data
            } else {
                var npromise = new Promise(function (resolve, reject) {
                    validarUsuario(params, resolve, reject);
                });

                npromise.then(function (data) {
                    if (data) {
                        var promiseUser = new Promise(function (resolve, reject) {
                            generateShortUrl(resolve);
                            });
                        promiseUser.then(function (data) {

                            var info = new Schemas.PrivateUrl({
                                    short: data
                                    , long: params.URI
                                    , user: params.username
                                    , tags: params.tags
                                , password: params.password
                                , share: params.share
                                , caducidad: params.caducidad
                                });

                                info.save(function (err, out) {
                                    if (err) return console.error(err);
                                    res.send({"shortUrl": out.short}); //send data
                                });

                        });
                    } else {
                        res.sendStatus(515);
                    }
                    }
                );
            }

        },
        function (err) {
            console.log(err);
            //res.sendStatus(412);
        }
    )
    ;

}
;

exports.fetchUrl = function (params, res) {


    var promise = new Promise(function (resolve, reject) {
        Schemas.ShortUrl.findOneAndUpdate({short: params.URI}, {
            $inc: {'statistics.click': 1}
        }, function (err, data) {
            if (err) reject(err);
            else resolve(data);
        });
    });
    promise.then(function (data) {
        if (data) res(data);
        else res([]);
    });
};


exports.fetchUrlInfo = function (params, res) {


    var promise = new Promise(function (resolve, reject) {
        Schemas.ShortUrl.findOne({short: params.URI}
            , function (err, data) {
                if (err) reject(err);
                else resolve(data);
            });
    });
    promise.then(function (data) {
        if (data) res(data);
        else res([]);
    });
};

exports.fetchPrivate = function (params, res) {


    var promise = new Promise(function (resolve, reject) {
        Schemas.PrivateUrl.findOne({short: params.URI}, function (err, data) {
            if (err) reject(err);
            else resolve(data);
        });
    });
    promise.then(function (data) {
        if (data) {
            console.log(data);
            if (data.password == params.password && (!data.caducidad || data.caducidad > Date.now())) {
                if (data.share.length > 0) {
                    var promiseUsuario = new Promise(function (resolve, reject) {
                        validarUsuario(params, resolve, reject);
                    });
                    promiseUsuario.then(function (user) {
                        if (user) {
                            var found = _.find(data.share, function (item) {
                                return item == params.username;
                            });
                            if (found) {
                                res.send({URI: data.long});
                            } else {
                                res.sendStatus(523);
                            }
                        } else {
                            res.sendStatus(522);
                        }
                    });

                } else {
                    res.send({URI: data.long});
                }
            }
            else {
                res.sendStatus(521);
            }

        }
        else {
            res.send({URI: ""});
        }
    });
};

exports.findUrlShort = function (params, res) {
    var args = {};

    if (params.description && params.title) {
        args = {description: params.description, title: params.title}
    } else if (params.description) {
        args = {description: params.description}
    } else if (params.title) {
        args = {title: params.title}
    }

    var promise = new Promise(function (resolve, reject) {
        Schemas.ShortUrl.find(args, function (err, data) {
            if (err) reject(err);
            else resolve(data);
        });
    });

    promise.then(function (data) {
        if (data) res(data);
        else res([]);
    });
};

function retriveMetaData(metadata) {


    var general = metadata.general;
    var descripcion = general.description;
    var title = general.title;
    var arrayDdescripcion = stopwords(descripcion.split(' '));
    var arrayTitle = stopwords(title.split(' '));


    return [arrayDdescripcion, arrayTitle];


}

function stopwords(array) {
    var dic = ['y', ',', 'las', 'en', '-', 'ultimas', 'de', 'la', 'el', 'sobre', 'los'];
    var nArray = [];
    _.forEach(array, function (item) {
        var found = _.findIndex(dic, function (o) {
            return o == item.toLowerCase();
        });
        if (found == -1) {
            nArray.push(item.toLowerCase());
        }
    });
    return nArray;
}

function validarUsuario(params, resolve, reject) {
    Usuario.UserAccount.findOne({user: params.username, token: params.token}, function (err, data) {
        if (err) reject(err);
        else {
            if (data.session > Date.now()) {
                resolve(data);
            } else {
                resolve8(null);
            }
        }
        ;
    });
}

function generateShortUrl(res) {

    var corta = Math.random().toString(36).slice(2);
    var promise = new Promise(function (resolve, reject) {
        Schemas.ShortUrl.findOne({short: corta}, function (err, data) {
            if (err) reject(err);
            else resolve(data);
        });
    });
    promise.then(function (data) {
        if (data)  return generateShortUrl(res);
        else res(corta);
    });
}
