/**
 * Express App ComponentTestServer
 *
 * @module ComponentTestServer
 * @author Globant
 * @version 1.0
 * @requires express
 * @requires express3-handlebars
 * @requires path
 * @return {Object} componentTestServer
 */

var express = require('express'),
    app = express(),
    exphbs = require('express-handlebars'),
    path = require('path');

app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.normalize(__dirname));

app.get('/component/*', function(req, res, next) {
    res.render('componentTestTemplate', {
        component: req.params[0]
    });
});


module.exports = app.listen(9992, function() {
    console.log('Components server listening on port ' + 9992);
    console.log('Navigate to /component/{path-to-component} to see your component samples');
});
