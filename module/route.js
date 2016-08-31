var express = require('express');
var router = express.Router();
var controllerURI = require('./uri/controllers');
var controllerUser = require('./user/controllers');


/* URI module. */
router.get('/generateShort/', controllerURI.crearUrlShort);
router.get('/publicShort/:URI', controllerURI.fetchShort);
router.get('/publicShort/:URI/info', controllerURI.fetchUrlInfo);
router.get('/privateShort/:URI/info', controllerURI.fetchPrivate);
router.get('/findShort/', controllerURI.findUrlShort);


/* User modulo */
router.post('/registryUser/', controllerUser.registryUser);  //USER POST
router.post('/autenticateUser/', controllerUser.autenticateUser); //USER GET

module.exports = router;
