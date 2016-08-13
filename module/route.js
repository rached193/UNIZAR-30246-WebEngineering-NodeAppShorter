var express = require('express');
var router = express.Router();
var controllerURI = require('./uri/controllers');
var controllerUser = require('./user/controllers');


/* URI module. */
router.get('/generateShort/:URI', controllerURI.crearUrlShort);
router.get('/fetchShort/:URI', controllerURI.fetchUrl);
router.get('/findShort/', controllerURI.findUrlShort);


/* User modulo */
router.post('/registryUser/', controllerUser.registryUser);
router.post('/autenticateUser/', controllerUser.autenticateUser);

module.exports = router;
