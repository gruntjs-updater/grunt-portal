
var express = require('express');
var hbs = require('express-handlebars');
var path = require('path');

module.exports = function(options) {
	var app = express()
	var assetsDir = path.join(__dirname, 'server-component');

	app.engine('hbs', hbs({ extname: '.hbs' }));
	app.set('view engine', 'hbs');
	app.set('views', assetsDir);

	app.use(express.static(assetsDir));

	app.get('/*', function(req, res, next) {
		//console.log('HIT', req.params);
	    res.render('componentTestTemplate', {
	        component: req.params[0]
	    });
	});

	return app;

}