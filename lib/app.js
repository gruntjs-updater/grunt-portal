var express = require('express');
var join = require('path').join;
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var getport = require('getport');
var _ = require('underscore');
var fs = require('fs');
var views = require('./views');

module.exports = function(options) {

    var app = express();

    views(app, options);

    app.use(favicon());
    if(options.verbose || !options.background) {
      app.use(logger('dev'));
    }
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    if (options.redirect) {
        _.each(options.redirect, function(redirectTo, path) {
            app.get(path, function(req, res) {
                res.redirect(redirectTo);
            });
        });
    }

    if(options.routes){
        for(var r in options.routes) {
            app.use(r, express.static(options.routes[r]));
        }
    }

    app.use('/doc/js', express.static('../doc/js'));
    app.use('/doc/api', require('./apidocs')(options));
    app.use('/doc', require('./doc')(options));
    app.use('/component', require('./component')(options));
    app.use(require('./proxies')(options));
    if (options.webmockDir) {
        app.use(require('./apimock')(options));
    }
    app.use(require('./portal')(app, options));

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

    getport(options.port || process.env.PORT || 3000, function(err, port) {
        app.listen(port, function() {
            console.log('Express server listening on port ' + port);
            if(options.background) {
                options.done();
            }
        });
    });

    return app;

};
