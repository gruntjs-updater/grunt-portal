var express = require('express');
var join = require('path').join;
var fs = require('fs');
var _ = require('underscore');
var file = require('grunt').file

module.exports = function(options) {

    var router = express.Router();

    router.get('/:application/*', function(req, res, next) {
		var initPath = join('/', options.appJsRoot, req.params.application);
		var opts = req.params;
		_.extend(opts, {
		    initScriptConfig: initPath + '.config.js',
		    component: req.params[0]
		});
		res.render('component', req.params);
    });
    
    
	router.get('/:application', function(req, res, next) {
		console.log(req.params);
		var componentsList = file.expand('test/functional/ui/**/*Samples.json')
			.map(function(component) {
				return component.match(/functional\/(.+)Samples/)[1];
			});

		var opts = {
		    application: req.params.application,
		    components: componentsList
		};

		res.render('component-list', opts);
    });
    return router;

};