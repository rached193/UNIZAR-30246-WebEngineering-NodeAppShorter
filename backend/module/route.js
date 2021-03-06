var express = require('express');
var router = express.Router();
var controllerURI = require('./uri/controllers');
var controllerUser = require('./user/controllers');
var controllerStatistics = require('./statistics/controllers');


/* URI module. */
router.get('/generateShort/', controllerURI.crearUrlShort);
router.get('/publicShort/:URI', controllerURI.fetchShort);
router.get('/publicShort/:URI/info', controllerURI.fetchUrlInfo);
router.get('/publicShort/:URI/info/:field', controllerURI.fetchUrlInfo);
router.get('/privateShort/:URI', controllerURI.fetchPrivate);
router.get('/findShort/', controllerURI.findUrlShort);

router.put('/privateShort/:URI', controllerURI.fetchPrivate);
router.delete('/privateShort/:URI', controllerURI.fetchPrivate);


/* User module */
router.post('/registryUser/', controllerUser.registryUser);  //USER POST
router.post('/autenticateUser/', controllerUser.autenticateUser); //USER GET

/*Statistics module */
router.get('/statistics/:field', controllerStatistics.statistics);  //USER POST

module.exports = router;
