var express = require('express');
var path = require('path');

module.exports = function(options) {

    var router = express.Router();

    router.get('*', function(req, res) {
        var pathParts = req.path.split('/');
        var lanHome = pathParts[1];
        var lanPortal = pathParts[3];
        var lanApplication = pathParts[4];
        var lanStep = pathParts[5];

        var lanHomeParts = lanHome.toUpperCase().split('_');
        var lanLanguage = lanHomeParts[0];
        var lanCountry = lanHomeParts[1];

        var initScriptConfig, initScript;

        if(!lanApplication) {
            next(new Error('Something went wrong :-('));
            return;
        }

        initScriptConfig = '/LAN/app/dev/js/' + lanApplication + '.config.js';
        initScript = '/LAN/app/dev/js/' + lanApplication + '.js';

        res.render('index', {
            initScriptConfig: initScriptConfig,
            initScript: initScript,
            home: lanHome || 'es_cl',
            portal: lanPortal || 'personas',
            application: lanApplication || 'certification',
            step: lanStep || 'init',
            language: lanLanguage || 'ES',
            country: lanCountry || 'CL',
            path: req.path
        });
    });

    return router;

}
