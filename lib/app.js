var express = require('express');
var join = require('path').join;
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');

module.exports = function(options) {

    var app = express();

    // view engine setup
    app.set('views', join(options.publicDir, 'views'));
    app.set('view engine', 'hbs');

    hbs.registerPartials(join(options.publicDir, 'views', 'partials'));

    app.use(favicon());
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(cookieParser());

    if(options.routes){
        for(var r in options.routes){
            app.use(r, express.static(options.routes[r]));
        }
    }

    app.use('/doc/api', require('../routes/apidocs')(options));
    app.use('/doc', require('../routes/doc')(options));
    app.use(require('../routes/apimock')(options));
    app.use(require('../routes/portal')(options));

    /// catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });

    app.set('port', options.port || process.env.PORT || 3000);
    var server = app.listen(app.get('port'), function() {
      console.log('Express server listening on port ' + server.address().port);
    });

    return app;

}
