var expect = require("chai").expect;
var chai = require("chai");
var chaiHttp = require('chai-http');

chai.use(chaiHttp);


var db = require('../bin/db');
var mongoose = require('mongoose');

mongoose.connection.db.dropCollection('UserAccount', function (err, result) {
    if (err) console.error(err);
    else console.log("Borrando Base de datos de Usuarios");
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