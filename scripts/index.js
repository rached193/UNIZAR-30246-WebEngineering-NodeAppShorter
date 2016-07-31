var express = require('express');
var router = express.Router();
var controller = require('./controllers');

/* GET home page. */
router.get('/generateShort/:URI', controller.crearUrlShort);
router.get('/fetchShort/:URI', controller.fetchUrl);
router.get('/findShort/', controller.findUrlShort);
router.get('/pruebas', controller.pruebas);

module.exports = router;
