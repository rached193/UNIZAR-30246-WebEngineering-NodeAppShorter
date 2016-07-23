var express = require('express');
var router = express.Router();
var controller = require('./controllers');

/* GET home page. */
router.get('/generateShort/:URI', controller.crearUrlShort);

module.exports = router;
