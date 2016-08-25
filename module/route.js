var express = require('express');
var router = express.Router();
var controllerURI = require('./uri/controllers');
var controllerUser = require('./user/controllers');


/* URI module. */
router.get('/generateShort/', controllerURI.crearUrlShort);
router.get('/fetchShort/:URI', controllerURI.fetchShort);
router.get('/fetchShort/:URI/info', controllerURI.fetchUrlInfo);
router.get('/findShort/', controllerURI.findUrlShort);


/* User modulo */
router.get('/registryUser/', controllerUser.registryUser);
router.post('/registryUser/', controllerUser.registryUser);
router.post('/autenticateUser/', controllerUser.autenticateUser);

module.exports = router;
