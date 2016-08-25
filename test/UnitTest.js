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

        chai.request(url).get("fetchShort/" + shortUrl)
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

        chai.request(url).post("fetchShort/info" + shortUrl)
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

describe("Autenticar Usuario", function () {


    var url = "http://localhost:3000/";

    it("Registar Usuario: Devuelve status 200", function (done) {

        var user = {
            username: 'vgheri',
            password: 'test'
        };
        chai.request(url).post('autenticateUser/')
            .send(user)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                done();
            })
    });

});
