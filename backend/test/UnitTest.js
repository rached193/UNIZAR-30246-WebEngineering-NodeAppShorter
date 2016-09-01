var expect = require("chai").expect;
var chai = require("chai");
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

var url = "http://localhost:3000/";
var shortUrl = '';
describe("Crear una Url en el sistema", function () {


    var URI = "http://es.gizmodo.com/";


    it("Crear una URl: Devuelve la Acortada", function (done) {


        chai.request(url).get('generateShort/?URI=' + URI)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                shortUrl = res.body.shortUrl;
                expect(shortUrl).to.exist;
                done();
            })
    });

    it("Si la Url ya esta registrada devuelve, la direcion corta registarada", function (done) {

        chai.request(url).get('generateShort/?URI=' + URI)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                var otherShort = res.body.shortUrl;
                expect(shortUrl).equal(otherShort);
                done();
            })
    });


    it("Comprueba que la direccion corta devuelve la misma URI que la creo", function (done) {

        chai.request(url).get("publicShort/" + shortUrl)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                var otherURL = res.body.URI;
                expect(otherURL).equal(URI);
                done();
            })
    });

});

describe("Estadisticas", function () {


    var url = "http://localhost:3000/";

    it("Recuperar la iformacion de la URL: Devuelve status 200", function (done) {

        chai.request(url).get('publicShort/' + shortUrl + '/info')
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                done();
            })
    });

});

describe("Registar Usuario", function () {


    var url = "http://localhost:3000/";

    it("Registar Usuario: Devuelve status 200", function (done) {

        var user = {
            username: 'vgheri',
            password: 'test'
        };
        chai.request(url).post('registryUser/')
            .send(user)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                done();
            })
    });

    it("Comprobar si el usuario se a creado devuelve error 413", function (done) {

        var user = {
            username: 'vgheri',
            password: 'test'
        };
        chai.request(url).post('registryUser/')
            .send(user)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(413);
                done();
            })
    });
});

var token = '';

describe("Autenticar Usuario", function () {


    var url = "http://localhost:3000/";

    it("Loguear Usuario: Devuelve status 200", function (done) {

        var user = {
            username: 'vgheri',
            password: 'test'
        };
        chai.request(url).post('autenticateUser/')
            .send(user)
            .end(function (err, res) {
                token = res.body.token;
                expect(res.statusCode).to.equal(200);
                done();
            })
    });

    it("Loguear Usuario: Refrescar token", function (done) {

        var user = {
            username: 'vgheri',
            password: 'test'
        };
        chai.request(url).post('autenticateUser/')
            .send(user)
            .end(function (err, res) {
                var rftoken = res.body.token;
                expect(res.statusCode).to.equal(200);
                expect(rftoken).to.not.equal(token);
                token = rftoken;
                done();
            })
    });

});

describe("Crear una URL privada: Libre Acceso", function () {
    var URI = "http://es.gizmodo.com/";

    it("Creada una Url privada asignada al usuario", function (done) {

        var user = {
            username: 'vgheri',
            token: token
        };

        chai.request(url).get('generateShort/?URI=' + URI + '&private=true')
            .send(user)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                shortUrl = res.body.shortUrl;
                done();
            })
    });

    var URIERR = "http://www.elmundo.es/";
    it("Intentar crear una URL con el token incorrecto", function (done) {

        var user = {
            username: 'vgheri',
            token: 'test'
        };

        chai.request(url).get('generateShort/?URI=' + URIERR + '&private=true')
            .send(user)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(515);
                done();
            })
    });

    it("Recuperar la URI", function (done) {

        chai.request(url).get("privateShort/" + shortUrl)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                var otherURL = res.body.URI;
                expect(otherURL).equal(URI);
                done();
            })
    });
});


describe("Crear una URL privada: Contraseña.", function () {
    var URI = "http://www.20minutos.es/";

    it("Creada una Url privada asignada al usuario", function (done) {

        var user = {
            username: 'vgheri',
            token: token,
            password: 'usuario'
        };

        chai.request(url).get('generateShort/?URI=' + URI + '&private=true')
            .send(user)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                shortUrl = res.body.shortUrl;
                done();
            })
    });


    it("Accede a la uri, introduciendo la contraseña.", function (done) {

        var pass = {
            password: 'usuario'
        };

        chai.request(url).get("privateShort/" + shortUrl)
            .send(pass)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                var otherURL = res.body.URI;
                expect(otherURL).equal(URI);
                done();
            })
    });


    it("Intentar recuperar la URI, con la contraseña incorrecta", function (done) {

        var pass = {
            password: 'other'
        };

        chai.request(url).get("privateShort/" + shortUrl)
            .send(pass)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(521);
                done();
            })
    });
});

describe("Crear una URL privada: Visibilidad.", function () {
    var URI = "http://www.elconfidencial.com/";

    it("Creada una Url privada: Permisos de visibilida al Usuario 'Willy'", function (done) {

        var user = {
            username: 'vgheri',
            token: token,
            share: ['Willy']
        };

        chai.request(url).get('generateShort/?URI=' + URI + '&private=true')
            .send(user)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                shortUrl = res.body.shortUrl;
                done();
            })
    });


    it("Registar Usuario: Willy", function (done) {

        var user = {
            username: 'Willy',
            password: 'test'
        };
        chai.request(url).post('registryUser/')
            .send(user)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                done();
            })
    });
    var tokenDummy = '';

    it("Loguear Usuario: Willy", function (done) {

        var user = {
            username: 'Willy',
            password: 'test'
        };
        chai.request(url).post('autenticateUser/')
            .send(user)
            .end(function (err, res) {
                tokenDummy = res.body.token;
                expect(res.statusCode).to.equal(200);
                done();
            })
    });

    it("Recuperar la URI: Willy.", function (done) {

        var pass = {
            username: 'Willy',
            token: tokenDummy
        };

        chai.request(url).get("privateShort/" + shortUrl)
            .send(pass)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                var otherURL = res.body.URI;
                expect(otherURL).equal(URI);
                done();
            })
    });

    it("Itentar la URI: vgheri.", function (done) {

        var pass = {
            username: 'vgheri',
            token: token
        };

        chai.request(url).get("privateShort/" + shortUrl)
            .send(pass)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(523);
                done();
            })
    });


});

describe("Crear una URL privada: Caducidad.", function () {
    var URI = "http://www.3djuegos.com/";

    it("Creada una Url privada: Fecha limite +1 dia", function (done) {

        var date = new Date();

        date.setDate(date.getDate() + 1);

        var user = {
            username: 'vgheri',
            token: token,
            caducidad: date
        };

        chai.request(url).get('generateShort/?URI=' + URI + '&private=true')
            .send(user)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                shortUrl = res.body.shortUrl;
                done();
            })
    });

    it("Recuperar la URI: Dentro del limite", function (done) {

        chai.request(url).get("privateShort/" + shortUrl)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                var otherURL = res.body.URI;
                expect(otherURL).equal(URI);
                done();
            })
    })


    it("Creada una Url privada: Fecha limite -1 dia", function (done) {
        var URIDate = "http://www.genbeta.com/";
        var date = new Date();

        date.setDate(date.getDate() - 1);

        var user = {
            username: 'vgheri',
            token: token,
            caducidad: date
        };

        chai.request(url).get('generateShort/?URI=' + URIDate + '&private=true')
            .send(user)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                shortUrl = res.body.shortUrl;
                done();
            })
    });

    it("Recuperar la URI: Expirada", function (done) {

        chai.request(url).get("privateShort/" + shortUrl)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(521);
                done();
            })
    });

});