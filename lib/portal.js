var express = require('express');
var join = require('path').join;
var exists = require('fs').existsSync;
var _ = require('underscore');

module.exports = function(app, options) {

    var router = express.Router();

    var resolvePortalViewsPrefix = function(prefix, params){
        prefix || (prefix = "");
        for(var i in params){
            var regexp = new RegExp(':' + i, 'g');
            prefix = prefix.replace(regexp, params[i]);
        }
        return prefix;
    }

    router.get('/:language([A-z]{2})_:country/apps/:portal/:application/:step?', function(req, res, next) {

        var prefix = resolvePortalViewsPrefix(options.portalViewsPrefix, req.params);

        var initPath = join('/', options.appJsRoot, req.params.application);
        var opts = req.params;
        _.extend(opts, {
            initScriptConfig: initPath + '.config.js',
            initScript: initPath + '.js',
            step: opts.step || 'init',
            home: [opts.language, opts.country].join("_"),
            language: opts.language.toUpperCase(),
            country: opts.country.toUpperCase(),
            configuration: JSON.stringify(options.configuration)
        });

        var missingFiles = _.reject([opts.initScriptConfig, opts.initScript], function(path) {
            return exists(join(process.cwd(), path));
        });

        if (missingFiles.length) {
            next(new Error("Missing files:\n" + missingFiles.join("\n")));
        } else {
            if(options.useHTML) {
                res.sendFile(join(process.cwd(), app.get('views'), prefix, 'index.html'));
            } else {
                res.render(join(prefix, 'index'), req.params);
            }
        }

    });

    return router;

};
