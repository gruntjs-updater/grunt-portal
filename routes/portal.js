var express = require('express');
var join = require('path').join;
var exists = require('fs').existsSync;
var reject = require('underscore').reject;

module.exports = function(options) {

    var router = express.Router();

    router.get('*', function(req, res, next) {
        var pathParts = req.path.split('/');
        var lanHome = pathParts[1];
        var lanPortal = pathParts[3];
        var lanApplication = pathParts[4];
        var lanStep = pathParts[5];

        var lanHomeParts = lanHome.toUpperCase().split('_');
        var lanLanguage = lanHomeParts[0];
        var lanCountry = lanHomeParts[1];

        var initPath = join('/', options.appJsRoot, lanApplication);
        var initScriptConfig = initPath + '.config.js';
        var initScript = initPath + '.js';

        var missingFiles = reject([initScriptConfig, initScript], function(path) {
            var fullPath = join(process.cwd(), path);
            return exists(fullPath);
        });

        if (missingFiles.length) {
            return next(new Error("Missing files:\n" + missingFiles.join("\n")));
        } else {
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
        }
        
    });

    return router;

}
