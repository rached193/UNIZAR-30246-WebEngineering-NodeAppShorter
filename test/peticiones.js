var expect = require("chai").expect;
var chai = require("chai");
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

var chai = require('chai');

describe("Registar Usuario", function () {


    var url = "http://localhost:3000/";

    it("returns status 200", function (done) {

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


});