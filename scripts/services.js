var Schemas = require('../models/shortUrl');



exports.crearUrlShort = function () {

    console.log(Schemas);
    var thor = new Schemas.Movie({
        title: 'Gatitos'
        , rating: 'PG-13'
        , releaseYear: '2011'  // Notice the use of a String rather than a Number - Mongoose will automatically convert this for us.
        , hasCreditCookie: true
    });

    thor.save(function(err, thor) {
        if (err) return console.error(err);
        console.dir(thor);
    });
};

